export type CaseStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  thesis: string;
  description: string;
  context: string;
  timeframe: string;
  status: string;
  domains: string[];
  evidence: string[];
  stack: string[];
  artifact?: {
    label: string;
    href: string;
  };
  problem: string;
  decisions: string[];
  system: {
    label: string;
    items: string[];
  }[];
  tradeoffs: string[];
  role: string;
  proves: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'burger-king-mobile-scale',
    title: 'Burger King Mobile App at Scale',
    eyebrow: 'Scale-up production work',
    thesis:
      'Mobile product work inside a real ordering business, where reliability, regional complexity, and team execution matter.',
    description:
      'Frontend architecture and stabilization work for a React Native ordering product used across the USA, Europe, and Canada.',
    context:
      'At Restaurant Brands International / Santex, Juan worked on the Burger King mobile app in a product environment where small technical decisions can affect ordering reliability, restaurant discovery, and regional rollout quality.',
    timeframe: '2022 - Present',
    status: 'Production scale-up experience',
    domains: ['React Native', 'Ordering', 'Frontend Architecture', 'Scale-up'],
    evidence: [
      'Production mobile app',
      'USA, Europe, and Canada scope',
      'Frontend stabilization',
      'Team-based delivery',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'GraphQL', 'Analytics'],
    artifact: {
      label: 'Download CV',
      href: '/CV_Juan_Obrach.pdf',
    },
    problem:
      'Ordering products carry hidden complexity: restaurant state, user state, regional behavior, performance, and the pressure of real customer sessions. The work is less about isolated screens and more about making flows resilient enough for product teams to keep moving.',
    decisions: [
      'Treat mobile architecture as product infrastructure, not only UI implementation.',
      'Separate ordering concerns from restaurant discovery and supporting state so flows can be reasoned about independently.',
      'Keep product changes shippable by working within the existing team architecture instead of forcing rewrites.',
      'Prioritize stabilization and performance where they protect the user journey and the business outcome.',
    ],
    system: [
      {
        label: 'Mobile product surface',
        items: [
          'React Native app with customer-facing ordering and restaurant flows.',
          'Frontend architecture that had to support multiple markets and product needs.',
          'Release-sensitive work where reliability matters more than cleverness.',
        ],
      },
      {
        label: 'Execution context',
        items: [
          'Collaboration inside an established product and engineering organization.',
          'Work shaped by delivery constraints, QA feedback, analytics, and production risk.',
          'Technical decisions made at a confidentiality-safe abstraction level.',
        ],
      },
    ],
    tradeoffs: [
      'Improving architecture inside a live product means choosing migration paths that preserve delivery velocity.',
      'Some proof must remain narrative because employer systems and metrics are private.',
      'The work favors operational judgment over flashy greenfield architecture.',
    ],
    role:
      'Senior Software Engineer contributing to mobile architecture, stabilization, and product delivery inside a scale-up environment.',
    proves: [
      'Juan has shipped within structured engineering teams, not only solo projects.',
      'He can work with production constraints, cross-market complexity, and existing systems.',
      'He brings product engineering judgment to mobile work where user trust and business flows are connected.',
    ],
  },
  {
    slug: 'flowtranslate-ai-learning-system',
    title: 'Flowtranslate AI Learning System',
    eyebrow: 'AI learning product',
    thesis:
      'A translation-first PWA that turns everyday translation history into personalized language learning.',
    description:
      'Flowtranslate keeps translation fast, then uses saved history to generate study articles, grammar feedback, and practice paths.',
    context:
      'Flowtranslate started from a real behavior: wanting to write or understand English quickly, then learn from those daily moments later. The product balances fast translation with a separate learning flow that can use the user history as material.',
    timeframe: '2026',
    status: 'Experimental product',
    domains: ['AI UX', 'Language Learning', 'PWA', 'Supabase'],
    evidence: [
      'Bidirectional translation flow',
      'Learning from history',
      'Quota-aware AI usage',
      'Study article direction',
    ],
    stack: ['React', 'Vite', 'Supabase Auth', 'Edge Functions', 'Gemini'],
    artifact: {
      label: 'Open app',
      href: 'https://flowtranslate.app',
    },
    problem:
      'Most translation tools optimize for a single answer and forget the context. For a learner, the valuable material is the trail of real phrases they needed during the week, including what other people wrote to them.',
    decisions: [
      'Keep the translation interaction fast and low-friction instead of forcing learning into every input.',
      'Treat saved translations as learning context that can later become study material.',
      'Use faster model paths for translation while leaving richer generation for study content.',
      'Make quota visible and account-based so AI cost can become a product boundary instead of an invisible risk.',
    ],
    system: [
      {
        label: 'Product surface',
        items: [
          'Web PWA with translation as the primary flow.',
          'Separate learning surface that can open historical conversations into focused study.',
          'Study article direction designed around grammar, tense, syntax, and common mistakes.',
        ],
      },
      {
        label: 'AI and data flow',
        items: [
          'Supabase Auth profiles and translation records in a dedicated schema.',
          'Server-side Gemini calls through the flowtranslate-generate Edge Function.',
          'Usage events and monthly quota checks before expensive AI work.',
        ],
      },
    ],
    tradeoffs: [
      'A fast translation flow can conflict with a richer learning interface, so the product separates immediate output from deeper study.',
      'Autodetect and rewrite behavior can simplify the UI, but it requires careful feedback copy so users understand what happened.',
      'Saved history makes learning more personal, but it raises product responsibility around privacy and account data.',
    ],
    role:
      'Solo product engineer owning the product concept, UX direction, frontend, Supabase integration, AI orchestration, quota behavior, and deployment path.',
    proves: [
      'Juan can turn a personal learning need into a product system with cost and data boundaries.',
      'He thinks about AI as product leverage, not decoration.',
      'He can connect frontend speed, backend constraints, and learning experience into one loop.',
    ],
  },
  {
    slug: 'tablia-restaurant-menu-ai-workflow',
    title: 'Tablia Restaurant Menu AI Workflow',
    eyebrow: 'B2B workflow product',
    thesis:
      'A B2B tool that turns messy restaurant menus into a live QR experience, an AI guest assistant, and owner analytics.',
    description:
      'Tablia imports existing menus from text, PDF, or image, normalizes them into structured data, and publishes a mobile-friendly guest experience.',
    context:
      'Restaurants already have menus, but they are often trapped in PDFs, screenshots, outdated documents, or inconsistent formats. Tablia treats that mess as the input, then gives owners a review-and-publish workflow instead of manual data entry.',
    timeframe: '2026',
    status: 'Active Entity Builders product',
    domains: ['B2B SaaS', 'AI Parsing', 'QR Menus', 'Analytics'],
    evidence: [
      'AI menu import',
      'Human review workflow',
      'Public QR landing page',
      'Guest assistant and analytics',
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Supabase', 'Gemini', 'PostHog'],
    artifact: {
      label: 'View app page',
      href: '/apps/tablia',
    },
    problem:
      'A restaurant owner should not need to rebuild a menu by hand just to create a modern QR experience. The hard part is absorbing messy real-world input, preserving owner control, and publishing something guests can actually use.',
    decisions: [
      'Use import, review, publish as the core workflow so AI accelerates setup without removing owner control.',
      'Normalize parsed menu data into durable categories and items before it reaches the public guest surface.',
      'Make the guest assistant part of the menu experience, not a separate chatbot gimmick.',
      'Include owner analytics so the system becomes an operating layer, not only a QR page generator.',
    ],
    system: [
      {
        label: 'Owner workflow',
        items: [
          'Menu import from PDF, image, or text.',
          'Review tools for categories, items, descriptions, and prices.',
          'Protected dashboard for venues, menus, engagement settings, and QR publishing.',
        ],
      },
      {
        label: 'Guest and analytics layer',
        items: [
          'Public `/m/:slug` menu route for QR scans.',
          'Conversational menu assistant powered by venue/menu context.',
          'Analytics and engagement services for owner-facing insight.',
        ],
      },
    ],
    tradeoffs: [
      'AI parsing saves time, but owners still need review controls because menus are commercial source material.',
      'A QR menu can be simple, but the product becomes more valuable when assistant and analytics share the same structured menu data.',
      'B2B setup must feel fast without hiding the state that owners need to trust before publishing.',
    ],
    role:
      'Solo product engineer owning the B2B product shape, React app, Supabase schema usage, AI menu parsing, guest assistant, analytics integration, and Cloudflare deployment target.',
    proves: [
      'Juan can productize messy real-world data into a controlled workflow.',
      'He can connect AI ingestion, human review, public publishing, and analytics into one B2B system.',
      'He understands how to make AI useful inside an operator workflow.',
    ],
  },
  {
    slug: 'entity-builders-product-engineering-system',
    title: 'Entity Builders Product Engineering System',
    eyebrow: 'Independent operating system',
    thesis:
      'A monorepo and spec-driven workflow for validating multiple products without rebuilding the same foundations every time.',
    description:
      "Entity Builders is the operating layer behind Juan's independent products: apps stay thin, shared logic becomes reusable, and OpenSpec preserves product memory.",
    context:
      'Independent product work can collapse into scattered prototypes. Entity Builders is the counter-system: one workspace, shared rules, reusable packages, app-scoped context, and durable OpenSpec changes that let ideas move from fuzzy to shippable.',
    timeframe: '2026',
    status: 'Active product engineering system',
    domains: ['Monorepo', 'Product Ops', 'OpenSpec', 'AI-assisted Delivery'],
    evidence: [
      'Yarn workspace monorepo',
      'Shared platform rules',
      'OpenSpec product memory',
      'Multiple active apps',
    ],
    stack: ['Yarn Workspaces', 'Astro', 'React', 'Supabase', 'OpenSpec', 'Cloudflare'],
    artifact: {
      label: 'Read the workflow article',
      href: '/blog/spec-driven-development-openspec-spec-kit',
    },
    problem:
      'A solo builder needs speed, but speed without structure creates repeated work and forgotten decisions. The challenge is keeping validation fast while preserving enough architecture and product memory to keep compounding.',
    decisions: [
      'Use web/PWA-first validation unless a native platform reason is documented.',
      'Keep apps thin and move reusable business logic, AI orchestration, analytics, and infrastructure helpers into packages.',
      'Use OpenSpec for durable product memory before substantial behavior changes.',
      'Treat specs as working tools, not bureaucracy, with progressive rigor based on risk.',
    ],
    system: [
      {
        label: 'Workspace architecture',
        items: [
          'Multiple products under `apps/` with shared packages and backend infrastructure.',
          'Reusable patterns for Supabase, AI, analytics, deployment, and app-scoped agent context.',
          'Portfolio, Tablia, Flowtranslate, PostalPeek, and other products sharing one operating base.',
        ],
      },
      {
        label: 'Product memory loop',
        items: [
          'OpenSpec proposals, designs, task lists, and permanent specs.',
          'Agent rules that preserve architecture, database, platform, and workflow decisions.',
          'Verification scaled by risk so small changes stay lightweight and risky ones get stronger checks.',
        ],
      },
    ],
    tradeoffs: [
      'A shared system adds ceremony, so the process must stay lightweight enough for a solo builder.',
      'Reuse is valuable only when it does not slow down validation.',
      'AI-assisted work needs durable context or every session starts from scratch.',
    ],
    role:
      'Founder and solo product engineer designing the monorepo, operating rules, app patterns, OpenSpec workflow, and reusable product infrastructure.',
    proves: [
      'Juan thinks beyond tickets and can design an execution system around ambiguous product work.',
      'He has taste for operational leverage: reusable code, durable decisions, and fast validation loops.',
      'He can connect product strategy, architecture, AI-assisted workflows, and delivery habits.',
    ],
  },
];

export const featuredCaseStudies = caseStudies.slice(0, 3);

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
