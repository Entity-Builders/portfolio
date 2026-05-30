import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, '..');
const blogDir = path.join(appRoot, 'src/content/blog');
const outputDir = path.join(appRoot, 'social-drafts');
const siteUrl = 'https://juanobrach.dev';
const maxXChars = 280;
const tagAliases = {
  e2e: '#E2E',
  ios: '#iOS',
  ux: '#UX',
  'ui-architecture': '#UIArchitecture',
  'react-native': '#ReactNative',
  'yarn-workspaces': '#YarnWorkspaces',
  'metro-bundler': '#MetroBundler',
};

const editorialDrafts = {
  'maestro-e2e-expo-gotchas': {
    angle: 'Mobile E2E testing fails in environment details, not just test syntax.',
    singles: [
      'Mobile E2E testing usually fails in the margins: autocorrect, keyboard focus, hidden views, dev-client state.\n\nI wrote up the real Maestro + Expo gotchas from an iOS happy-path test.\n\n{url}',
      'A Maestro test that should have been "login -> create budget -> done" turned into a tour of iOS edge cases.\n\nThe fixes were less about syntax and more about making the app testable.\n\n{url}',
      'One thing mobile E2E taught me again: if a view is 0x0 or opacity:0, your test may not see it even if your brain does.\n\nNotes from debugging Maestro + Expo on iOS:\n\n{url}',
    ],
    thread: [
      '1/4 Mobile E2E testing is not just "write a script and press play". The hard part is the environment: keyboard state, autocorrect, dev-client overlays, accessibility trees.',
      '2/4 In our Expo iOS flow, Maestro hit errors that looked random: email input corruption, keyboard dismissal failures, invisible readiness markers, and taps that did not focus the real input.',
      '3/4 The fixes were mostly product/testability fixes: stable test IDs, explicit keyboard handling, no hidden 0x0 readiness views, conditional flows for the Expo launcher, and deterministic auth seams.',
      '4/4 I wrote the full breakdown here: {url}',
    ],
  },
  'react-invalid-hook-call': {
    angle: 'A runtime hook crash caused by module resolution, not incorrect component code.',
    singles: [
      'The worst React bugs are the ones where the component code is correct.\n\nOur Invalid Hook Call came from dependency resolution: Metro loaded two React instances inside one app.\n\nI wrote the diagnosis and fix here:\n\n{url}',
      '"Cannot read property useState of null" sounds like a hook bug. In our case, it was React losing its dispatcher because the app had duplicate module instances.\n\n{url}',
      'Monorepos make dependency mistakes look like runtime mysteries.\n\nThis is the anatomy of an Invalid Hook Call caused by duplicate React, and the checklist I now reach for first.\n\n{url}',
    ],
    thread: [
      '1/4 "Invalid Hook Call" is usually framed as "you broke the Rules of Hooks". Sometimes the component code is fine and the module graph is the problem.',
      '2/4 In our monorepo, Metro loaded one React instance for the app and another for a shared package. Hooks rely on a shared dispatcher, so that split made React lose its own context.',
      '3/4 The fix was dependency hygiene: React belongs in peerDependencies for shared UI packages, not as a local devDependency that can become a second runtime copy.',
      '4/4 Diagnosis and checklist: {url}',
    ],
  },
  'react-invalid-hook-call-monorepo': {
    angle: 'A tiny workspace dependency shape can create a phantom React instance.',
    singles: [
      'Invalid Hook Call is often blamed on broken hook rules. In monorepos, the scarier cause is two Reacts in memory.\n\nI wrote about the Yarn Workspace dependency shape that creates the phantom React instance.\n\n{url}',
      'React hooks depend on a singleton. If a shared package brings its own React, Metro can wire your app to one dispatcher and your package to another.\n\nThat is how a harmless devDependency becomes a runtime crash.\n\n{url}',
      "The fix for our Invalid Hook Call was not changing component code. It was deleting React from a shared package's devDependencies and letting peerDependencies do their job.\n\n{url}",
    ],
    thread: [
      '1/4 The scary version of "Invalid Hook Call" is when no hook rule is broken. In a workspace, a small package.json choice can create a second React instance.',
      '2/4 Shared packages should describe React as a peer contract. If they install their own local React, the app renderer and imported components can speak to different dispatchers.',
      '3/4 The practical checklist: inspect yarn why react, remove misleading devDependencies, delete local node_modules, reinstall, and restart Metro with a clean cache.',
      '4/4 Full monorepo autopsy: {url}',
    ],
  },
  'ui-modals-vs-bottomsheets': {
    angle: 'Premium mobile UX often comes from decoupling the animation model.',
    singles: [
      'A React Native Modal can technically work and still feel wrong.\n\nThe tell: backdrop and content slide together, making the whole interaction feel heavy. I wrote about moving that flow to Gorhom BottomSheetModal.\n\n{url}',
      "Small animation details change how premium a mobile app feels.\n\nIn this write-up: why React Native's default Modal slide feels clunky, and how decoupling backdrop opacity from sheet movement fixes it.\n\n{url}",
      'The fix was architectural, not cosmetic: move the sheet into a provider/portal, control it with refs, and let backdrop + content animate independently.\n\n{url}',
    ],
    thread: [
      '1/4 A mobile interaction can be technically correct and still feel cheap. That was our React Native Modal: the backdrop and sheet slid up together.',
      '2/4 The user expects two different motions: backdrop fades in, content springs up. Coupling both into the native Modal slide animation makes the whole screen feel heavy.',
      '3/4 The fix was architectural: render sheets through a provider/portal, control them with refs, and let backdrop opacity and sheet position animate independently.',
      '4/4 Full write-up: {url}',
    ],
  },
};

function normalizeWhitespace(value) {
  return value.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

function stripMarkdown(value) {
  return normalizeWhitespace(
    value
      .replace(/```[\s\S]*?```/g, '')
      .replace(/^---$/gm, '')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/^>\s?/gm, '')
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/^\|.*\|$/gm, '')
  );
}

function firstUsefulParagraph(content) {
  return (
    stripMarkdown(content)
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .find((paragraph) => paragraph.length > 80 && !paragraph.startsWith('Error '))
    ?? ''
  );
}

function truncateAtWord(value, maxChars) {
  if ([...value].length <= maxChars) {
    return value;
  }

  const truncated = [...value].slice(0, Math.max(0, maxChars - 3)).join('');
  const lastSpace = truncated.lastIndexOf(' ');
  return `${truncated.slice(0, lastSpace > 80 ? lastSpace : truncated.length).trim()}...`;
}

function fitPost(value) {
  const text = normalizeWhitespace(value);
  if ([...text].length <= maxXChars) {
    return text;
  }

  const urlMatch = text.match(/https?:\/\/\S+\s*$/);
  if (!urlMatch) {
    return truncateAtWord(text, maxXChars);
  }

  const url = urlMatch[0].trim();
  const body = text.slice(0, urlMatch.index).trim();
  const bodyLimit = maxXChars - [...url].length - 2;
  return `${truncateAtWord(body, bodyLimit)}\n\n${url}`;
}

function applyUrl(template, url) {
  return template.replaceAll('{url}', url);
}

function toHashtag(tag) {
  if (tagAliases[tag]) {
    return tagAliases[tag];
  }

  const normalized = tag
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('');

  return `#${normalized.replace(/[^a-zA-Z0-9]/g, '')}`;
}

function fallbackDrafts(post) {
  const lead = post.description || firstUsefulParagraph(post.content);
  const topics = post.tags.slice(0, 3).join(', ') || 'software engineering';

  return {
    angle: `Practical notes on ${topics}.`,
    singles: [
      `${truncateAtWord(lead, 165)}\n\nNotes from the build/debugging log:\n\n{url}`,
      `I wrote up a practical debugging note on ${topics}.\n\nThe useful part is the shape of the failure and the fix, not just the final code.\n\n{url}`,
      `New write-up: ${post.title}\n\n${truncateAtWord(lead, 135)}\n\n{url}`,
    ],
    thread: [
      `1/4 New write-up: ${post.title}`,
      `2/4 The core issue: ${truncateAtWord(lead, 190)}`,
      '3/4 I tried to keep the article focused on the failure mode, the diagnosis path, and the fix I would reuse next time.',
      '4/4 Full article: {url}',
    ],
  };
}

function renderDraftFile(post) {
  const draft = editorialDrafts[post.slug] ?? fallbackDrafts(post);
  const singles = draft.singles.map((template) => fitPost(applyUrl(template, post.url)));
  const thread = draft.thread.map((template) => fitPost(applyUrl(template, post.url)));
  const tags = post.tags.map(toHashtag).join(' ');

  const lines = [
    `# X drafts: ${post.title}`,
    '',
    `Source: ${post.url}`,
    `Date: ${post.date}`,
    `Suggested tags: ${tags || 'none'}`,
    '',
    `Editorial angle: ${draft.angle}`,
    '',
    '> These are drafts, not auto-posted copy. Re-running the generator rewrites this file.',
    '',
    '## Single-post drafts',
    '',
  ];

  singles.forEach((single, index) => {
    lines.push(`### Draft ${index + 1} (${[...single].length} chars)`, '', single, '');
  });

  lines.push('## Thread draft', '');
  thread.forEach((item, index) => {
    lines.push(`### Post ${index + 1}/${thread.length} (${[...item].length} chars)`, '', item, '');
  });

  return `${lines.join('\n').trim()}\n`;
}

function renderIndex(posts) {
  const lines = [
    '# Blog social drafts',
    '',
    'Generated from `src/content/blog`.',
    '',
    'Run:',
    '',
    '```bash',
    'yarn blog:social',
    '```',
    '',
    '## Draft files',
    '',
    '| Date | Article | Draft file |',
    '| --- | --- | --- |',
  ];

  posts.forEach((post) => {
    lines.push(`| ${post.date} | ${post.title} | [${post.slug}.md](./${post.slug}.md) |`);
  });

  return `${lines.join('\n')}\n`;
}

async function readPosts() {
  const files = (await fs.readdir(blogDir)).filter((file) => file.endsWith('.md')).sort();

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = await fs.readFile(path.join(blogDir, file), 'utf8');
      const parsed = matter(raw);
      const date = new Date(parsed.data.date);

      return {
        slug,
        title: parsed.data.title ?? slug,
        description: parsed.data.description ?? '',
        date: Number.isNaN(date.valueOf()) ? String(parsed.data.date ?? '') : date.toISOString().slice(0, 10),
        tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
        draft: Boolean(parsed.data.draft),
        content: parsed.content,
        url: `${siteUrl}/blog/${slug}/`,
      };
    })
  );

  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

async function main() {
  const posts = await readPosts();

  if (posts.length === 0) {
    throw new Error(`No blog posts found in ${blogDir}`);
  }

  await fs.mkdir(outputDir, { recursive: true });

  await Promise.all(
    posts.map((post) => fs.writeFile(path.join(outputDir, `${post.slug}.md`), renderDraftFile(post)))
  );
  await fs.writeFile(path.join(outputDir, 'index.md'), renderIndex(posts));

  console.log(`Generated ${posts.length} social draft files in ${path.relative(appRoot, outputDir)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
