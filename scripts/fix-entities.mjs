import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAPERS_PATH = path.join(__dirname, '..', 'src', 'data', 'papers.json');

const papers = JSON.parse(fs.readFileSync(PAPERS_PATH, 'utf8'));

let updated = 0;

for (const paper of papers) {
  if (paper.content) {
    const original = paper.content;
    paper.content = paper.content
      .replace(/&#8212;/g, '—') // em dash
      .replace(/&#8211;/g, '–') // en dash
      .replace(/&#8220;/g, '“') // left double quote
      .replace(/&#8221;/g, '”') // right double quote
      .replace(/&#8216;/g, '‘') // left single quote
      .replace(/&#8217;/g, '’') // right single quote
      .replace(/&#160;/g, ' ')  // non-breaking space
      .replace(/&#39;/g, "'")   // apostrophe
      .replace(/&amp;/g, '&');  // ampersand
      
    if (paper.content !== original) {
      updated++;
    }
  }
}

fs.writeFileSync(PAPERS_PATH, JSON.stringify(papers, null, 2), 'utf8');
console.log(`Updated HTML entities in ${updated} papers.`);
