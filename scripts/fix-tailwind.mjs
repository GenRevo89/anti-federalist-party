import fs from 'fs';
import path from 'path';

const cssPath = path.join(process.cwd(), 'src/app/landing.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(/@apply glass-panel;/g, '@apply bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl;');

fs.writeFileSync(cssPath, css);
console.log('landing.css updated with raw tailwind classes.');

const globalsPath = path.join(process.cwd(), 'src/app/globals.css');
let globalsCss = fs.readFileSync(globalsPath, 'utf8');
globalsCss = globalsCss.replace(/@layer components {\s*\.glass-panel {\s*@apply[^;]+;\s*}\s*}\s*/, '');
fs.writeFileSync(globalsPath, globalsCss);
console.log('globals.css cleaned up.');
