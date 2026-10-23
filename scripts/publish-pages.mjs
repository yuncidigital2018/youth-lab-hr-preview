import { cp, mkdir, readdir, readFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const files = await readdir(dist);
if (files.sort().join(',') !== 'assets,index.html') throw new Error('Unexpected build output; review before publishing.');
const html = await readFile(path.join(dist, 'index.html'), 'utf8');
if (!html.includes('./assets/') || html.includes('/src/')) throw new Error('Expected relative compiled assets');
await mkdir(path.join(root, 'assets'), { recursive: true });
for (const file of await readdir(path.join(root, 'assets'))) {
  if (!/^index-[A-Za-z0-9_-]+\.(js|css)$/.test(file)) throw new Error('Unexpected existing asset; refusing cleanup');
}
await rm(path.join(root, 'assets'), { recursive: true });
await cp(path.join(dist, 'assets'), path.join(root, 'assets'), { recursive: true });
await cp(path.join(dist, 'index.html'), path.join(root, 'index.html'));
console.log('Published static files to index.html and assets; source remains in app.');
