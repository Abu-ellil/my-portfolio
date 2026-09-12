/**
 * Vercel build wrapper for CRA on newer Node images:
 * - raises the heap (webpack 4 + three.js tree is memory hungry)
 * - sets OpenSSL legacy provider (webpack 4 md4 hashing breaks on Node 17+)
 *
 * The build command is a fixed literal (no user input), so execSync with a
 * shell string is safe here.
 */
process.env.NODE_OPTIONS = [
  process.env.NODE_OPTIONS || '',
  '--max-old-space-size=4096',
  '--openssl-legacy-provider',
]
  .filter(Boolean)
  .join(' ');

require('child_process').execSync('npx react-scripts build', {
  stdio: 'inherit',
  env: process.env,
  cwd: __dirname + '/..',
});
