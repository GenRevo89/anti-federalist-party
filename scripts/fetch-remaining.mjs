/**
 * Fetch remaining Anti-Federalist Papers from Teaching American History
 * Covers: Centinel, Cato, Agrippa papers not found on constitution.org
 * 
 * Run: node scripts/fetch-remaining.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAPERS_PATH = path.join(__dirname, '..', 'src', 'data', 'papers.json');
const DELAY_MS = 2000;

const papers = JSON.parse(fs.readFileSync(PAPERS_PATH, 'utf8'));

// Teaching American History URL patterns
function getTAHUrl(id) {
  const match = id.match(/^(.+)-(\d+)$/);
  if (!match) return null;
  const [, author, num] = match;
  
  // Convert number to roman numeral for TAH
  const roman = toRoman(parseInt(num));
  
  const slugMap = {
    'centinel': `centinel-${roman.toLowerCase()}`,
    'cato': `cato-${roman.toLowerCase()}`,
    'agrippa': `agrippa-${roman.toLowerCase()}`,
  };
  
  const slug = slugMap[author];
  if (!slug) return null;
  return `https://teachingamericanhistory.org/document/${slug}/`;
}

function toRoman(num) {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  let result = '';
  for (let i = 0; i < vals.length; i++) {
    while (num >= vals[i]) { result += syms[i]; num -= vals[i]; }
  }
  return result;
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractTAHContent(html) {
  // TAH puts content in <div class="entry-content">
  const entryMatch = html.match(/<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/article>/i);
  if (entryMatch) {
    return stripHtml(entryMatch[1]);
  }
  
  // Fallback: try article tag
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) {
    return stripHtml(articleMatch[1]);
  }
  
  // Last resort: body
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    let content = stripHtml(bodyMatch[1]);
    // Remove navigation/header stuff
    const lines = content.split('\n').filter(l => l.trim().length > 50);
    return lines.join('\n\n');
  }
  
  return null;
}

async function fetchPaper(url) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (educational research bot)' }
    });
    if (!response.ok) {
      console.log(`  HTTP ${response.status}`);
      return null;
    }
    const html = await response.text();
    return extractTAHContent(html);
  } catch (err) {
    console.log(`  Error: ${err.message}`);
    return null;
  }
}

async function main() {
  // Only process papers that still have placeholder content
  const pending = papers.filter(p => p.content && p.content.includes('high-fidelity digitization'));
  console.log(`${pending.length} papers still need content\n`);
  
  let updated = 0;
  let failed = 0;
  
  for (let i = 0; i < pending.length; i++) {
    const paper = pending[i];
    const url = getTAHUrl(paper.id);
    
    if (!url) {
      console.log(`[${i + 1}/${pending.length}] ${paper.id} - No URL mapping`);
      failed++;
      continue;
    }
    
    console.log(`[${i + 1}/${pending.length}] Fetching ${paper.id} from TAH...`);
    const content = await fetchPaper(url);
    
    if (content && content.length > 200) {
      paper.content = content;
      updated++;
      console.log(`  ✓ Got ${content.length} chars`);
    } else {
      console.log(`  ✗ Content too short (${content?.length || 0} chars)`);
      failed++;
    }
    
    // Save every 3 papers
    if (updated % 3 === 0 && updated > 0) {
      fs.writeFileSync(PAPERS_PATH, JSON.stringify(papers, null, 2), 'utf8');
    }
    
    await new Promise(r => setTimeout(r, DELAY_MS));
  }
  
  fs.writeFileSync(PAPERS_PATH, JSON.stringify(papers, null, 2), 'utf8');
  console.log(`\nDone! Updated: ${updated}, Failed: ${failed}`);
}

main().catch(console.error);
