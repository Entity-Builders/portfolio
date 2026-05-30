import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath, pathToFileURL } from 'node:url';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, '..');
const sourceHtml = path.join(appRoot, 'cv/CV_Juan_Obrach.html');
const outputPdf = path.join(appRoot, 'public/CV_Juan_Obrach.pdf');

const chromeCandidates = [
  process.env.CHROME_BIN,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
].filter(Boolean);

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findChrome() {
  for (const candidate of chromeCandidates) {
    if (await fileExists(candidate)) {
      return candidate;
    }
  }

  throw new Error('Could not find Chrome. Set CHROME_BIN to a Chrome/Chromium executable.');
}

async function main() {
  const chrome = await findChrome();
  await fs.mkdir(path.dirname(outputPdf), { recursive: true });

  await execFileAsync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=3000',
    `--print-to-pdf=${outputPdf}`,
    pathToFileURL(sourceHtml).href,
  ]);

  console.log(`Generated ${path.relative(appRoot, outputPdf)} from ${path.relative(appRoot, sourceHtml)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
