import fs from 'fs';
import path from 'path';

const cssPath = path.join(process.cwd(), 'src/app/landing.css');
let css = fs.readFileSync(cssPath, 'utf8');

// The classes to target
const targets = [
  '.chapters-state-card',
  '.county-card',
  '.county-mission-card',
  '.county-action-card',
  '.county-involve-card',
  '.library-series-card',
  '.paper-context-card',
  '.paper-author-card',
  '.paper-nav-card',
  '.library-paper-card'
];

for (const target of targets) {
  // We want to find the block for the target and replace background/border/etc with @apply glass-panel;
  // Regex to find: target { ... }
  const regex = new RegExp(`(${target.replace(/\./g, '\\.')}\\s*\\{[^}]*?\\})`, 'g');
  
  css = css.replace(regex, (match) => {
    // If it's a hover class, skip or just remove background/border color changes
    if (match.includes(':hover')) return match;

    let modified = match;
    // Remove old properties
    modified = modified.replace(/\s*background:\s*rgba[^;]+;/g, '');
    modified = modified.replace(/\s*border:\s*1px solid rgba[^;]+;/g, '');
    modified = modified.replace(/\s*border-radius:[^;]+;/g, '');
    modified = modified.replace(/\s*backdrop-filter:[^;]+;/g, '');
    modified = modified.replace(/\s*-webkit-backdrop-filter:[^;]+;/g, '');
    modified = modified.replace(/\s*box-shadow:[^;]+;/g, '');
    
    // Insert @apply glass-panel; right after the opening brace
    modified = modified.replace('{', '{\n  @apply glass-panel;');
    
    return modified;
  });
}

fs.writeFileSync(cssPath, css);
console.log('landing.css updated successfully.');
