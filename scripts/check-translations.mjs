// Checks that the Slovak content (src/content/sk/) keeps up with the English one (src/content/en/).
//
// Errors (exit code 1):
//   - an English file without its Slovak counterpart, or the other way round;
//   - a project whose language-independent fields (order, period, tags) differ between the languages.
// Warnings (exit code 0):
//   - an English file committed after its Slovak counterpart, with the git command that shows what changed.
//
// Run with `npm run check`. In GitHub Actions, warnings appear as annotations on the run.
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = join(import.meta.dirname, '..');
const enDir = join(root, 'src/content/en');
const skDir = join(root, 'src/content/sk');
const inActions = Boolean(process.env.GITHUB_ACTIONS);
const sharedFields = ['order', 'period', 'tags'];

let errors = 0;
const report = (level, file, message) => {
  if (inActions) console.log(`::${level} file=${file}::${message}`);
  else console.log(`${level === 'error' ? 'Error' : 'Warning'}: ${file}: ${message}`);
  if (level === 'error') errors++;
};

const listFiles = (dir) =>
  readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => relative(dir, join(entry.parentPath, entry.name)));

const git = (...args) => {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};

// Top-level frontmatter lines like `order: 4`, keyed by field name.
const frontmatterFields = (path) => {
  const match = readFileSync(path, 'utf8').match(/^---\n([\s\S]*?)\n---/);
  const fields = {};
  for (const line of match?.[1].split('\n') ?? []) {
    const field = line.match(/^(\w+):\s*(.*)$/);
    if (field) fields[field[1]] = field[2].trim();
  }
  return fields;
};

const enFiles = listFiles(enDir);
const skFiles = existsSync(skDir) ? listFiles(skDir) : [];

for (const file of skFiles.filter((f) => !enFiles.includes(f))) {
  report('error', `src/content/sk/${file}`, 'Slovak file without an English counterpart in src/content/en/.');
}

const pairs = [];
for (const file of enFiles) {
  const en = `src/content/en/${file}`;
  const sk = `src/content/sk/${file}`;
  if (!skFiles.includes(file)) {
    report('error', en, `missing Slovak translation: ${sk}`);
    continue;
  }
  pairs.push({ en, sk });

  const enFields = frontmatterFields(join(root, en));
  const skFields = frontmatterFields(join(root, sk));
  for (const field of sharedFields) {
    if (enFields[field] !== skFields[field]) {
      report('error', sk, `"${field}" differs from the English file (${enFields[field] ?? 'missing'} vs ${skFields[field] ?? 'missing'}).`);
    }
  }
}

// Staleness needs the git history; CI must check out with fetch-depth: 0.
if (git('rev-parse', '--is-shallow-repository') !== 'false') {
  report('warning', 'scripts/check-translations.mjs', 'No full git history, skipping the check for outdated translations.');
} else {
  for (const { en, sk } of pairs) {
    const enTime = Number(git('log', '-1', '--format=%ct', '--', en));
    const skTime = Number(git('log', '-1', '--format=%ct', '--', sk));
    if (enTime && skTime && enTime > skTime) {
      const skCommit = git('log', '-1', '--format=%h', '--', sk);
      report('warning', sk, `the English file changed after this translation. See what changed: git diff ${skCommit} -- ${en}`);
    }
  }
}

if (errors > 0) {
  console.log(`Translation check failed with ${errors} error(s).`);
  process.exit(1);
}
console.log(`Translation check: ${pairs.length} file pair(s) checked.`);
