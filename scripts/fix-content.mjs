/**
 * Fix paper content formatting — merge line fragments back into real paragraphs.
 * The HTML scraper split every <br> and line wrap into \n\n, creating hundreds
 * of tiny fragments. This script reconsolidates them into proper paragraphs.
 * 
 * Run: node scripts/fix-content.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAPERS_PATH = path.join(__dirname, '..', 'src', 'data', 'papers.json');

const papers = JSON.parse(fs.readFileSync(PAPERS_PATH, 'utf8'));

function fixContent(raw) {
  if (!raw || raw.includes('high-fidelity digitization')) return raw;

  // Split into lines
  const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // Reconsolidate: join lines that are continuation of sentences.
  // A new paragraph starts when:
  // - Previous line ends with a period, question mark, colon, or closing quote AND
  //   the next line starts with a capital letter
  // - OR there was a blank line (already filtered out, so we detect by context)
  
  const paragraphs = [];
  let current = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (current === '') {
      current = line;
      continue;
    }
    
    // Check if this is a new paragraph
    const prevEndsComplete = /[.!?:;"\u201D]$/.test(current.trim());
    const thisStartsNew = /^[A-Z\u201C"(0-9]/.test(line);
    const isShortPrev = current.trim().length < 60;
    
    // A real paragraph break: previous sentence is complete AND new one starts with capital
    // But not if current line is very short (likely a continuation that got wrapped)
    if (prevEndsComplete && thisStartsNew && current.trim().length > 40) {
      paragraphs.push(current.trim());
      current = line;
    } else {
      // Join as continuation — add space if needed
      if (current.endsWith('-')) {
        // Hyphenated word break
        current = current.slice(0, -1) + line;
      } else {
        current += ' ' + line;
      }
    }
  }
  
  if (current.trim()) {
    paragraphs.push(current.trim());
  }
  
  // Filter out any navigation artifacts, super-short fragments, etc.
  const cleaned = paragraphs.filter(p => {
    if (p.length < 20) return false;
    if (/^(Next|Previous|Text Version|Contents|Home|Back|Search)/.test(p)) return false;
    if (p.includes('constitution.org') || p.includes('Liberty Library')) return false;
    return true;
  });
  
  return cleaned.join('\n\n');
}

let fixed = 0;
for (const paper of papers) {
  const before = paper.content;
  paper.content = fixContent(paper.content);
  if (paper.content !== before) fixed++;
}

fs.writeFileSync(PAPERS_PATH, JSON.stringify(papers, null, 2), 'utf8');

// Verify
const sample = papers[0];
const paras = sample.content.split('\n\n');
console.log(`Fixed ${fixed} papers`);
console.log(`\nBrutus #1 verification:`);
console.log(`  Paragraphs: ${paras.length}`);
console.log(`  Avg length: ${Math.round(paras.reduce((a, p) => a + p.length, 0) / paras.length)} chars`);
console.log(`  First paragraph: "${paras[0].substring(0, 120)}..."`);
