/**
 * Fetch Anti-Federalist Papers from constitution.org
 * URL pattern: https://constitution.org/1-Constitution/afp/{author}{num}.htm
 * 
 * Run: node scripts/fetch-papers.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAPERS_PATH = path.join(__dirname, '..', 'src', 'data', 'papers.json');
const DELAY_MS = 1500; // polite delay between requests

// Read existing papers
const papers = JSON.parse(fs.readFileSync(PAPERS_PATH, 'utf8'));

// Map paper IDs to constitution.org URL slugs
function getUrl(id) {
  // brutus-1 -> brutus01, federal-farmer-1 -> fedfar01, centinel-1 -> censin01
  // cato-1 -> cato01, agrippa-1 -> agrippa01, john-dewitt-1 -> dewitt01
  const match = id.match(/^(.+)-(\d+)$/);
  if (!match) return null;
  
  const [, author, num] = match;
  const padded = num.padStart(2, '0');
  
  const slugMap = {
    'brutus': `brutus${padded}`,
    'federal-farmer': `fedfar${padded}`,
    'centinel': `centin${padded}`,
    'cato': `cato_${padded}`,
    'agrippa': `agrippa${padded}`,
    'john-dewitt': `dewitt${padded}`,
  };
  
  const slug = slugMap[author];
  if (!slug) return null;
  return `https://constitution.org/1-Constitution/afp/${slug}.htm`;
}

function stripHtml(html) {
  // Remove HTML tags, decode entities, clean up whitespace
  let text = html
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
  return text;
}

function extractBody(html) {
  // Try to extract just the document body content
  // constitution.org puts the text in the body after the title
  
  // Remove navigation links at the bottom
  let content = html;
  
  // Find the main content between common markers
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) content = bodyMatch[1];
  
  // Remove header/navigation elements
  content = content.replace(/<h[12][^>]*>.*?<\/h[12]>/gi, '');
  content = content.replace(/<hr[^>]*>/gi, '');
  
  // Remove trailing navigation
  const navIdx = content.lastIndexOf('Next');
  if (navIdx > content.length * 0.8) {
    // Find the start of the nav line
    const lineStart = content.lastIndexOf('\n', navIdx);
    if (lineStart > 0) content = content.substring(0, lineStart);
  }
  
  const text = stripHtml(content);
  
  // Remove the first line if it's just a date
  const lines = text.split('\n').filter(l => l.trim());
  
  // Find where the actual content starts (after date header)
  let startIdx = 0;
  for (let i = 0; i < Math.min(3, lines.length); i++) {
    if (lines[i].match(/^\d+\s+(January|February|March|April|May|June|July|August|September|October|November|December)/i) ||
        lines[i].match(/^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d/i)) {
      startIdx = i + 1;
    }
  }
  
  return lines.slice(startIdx).join('\n\n');
}

async function fetchPaper(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`  HTTP ${response.status} for ${url}`);
      return null;
    }
    const html = await response.text();
    return extractBody(html);
  } catch (err) {
    console.log(`  Error fetching ${url}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log(`Found ${papers.length} papers to process`);
  
  let updated = 0;
  let failed = 0;
  
  for (let i = 0; i < papers.length; i++) {
    const paper = papers[i];
    
    // Skip if already has real content
    if (paper.content && !paper.content.includes('high-fidelity digitization')) {
      console.log(`[${i + 1}/${papers.length}] ${paper.id} - Already has content, skipping`);
      continue;
    }
    
    const url = getUrl(paper.id);
    if (!url) {
      console.log(`[${i + 1}/${papers.length}] ${paper.id} - No URL mapping, skipping`);
      failed++;
      continue;
    }
    
    console.log(`[${i + 1}/${papers.length}] Fetching ${paper.id} from ${url}...`);
    const content = await fetchPaper(url);
    
    if (content && content.length > 200) {
      paper.content = content;
      updated++;
      console.log(`  ✓ Got ${content.length} chars`);
    } else {
      console.log(`  ✗ Content too short or empty (${content?.length || 0} chars)`);
      failed++;
    }
    
    // Save progress incrementally
    if (updated % 5 === 0) {
      fs.writeFileSync(PAPERS_PATH, JSON.stringify(papers, null, 2), 'utf8');
    }
    
    // Polite delay
    await new Promise(r => setTimeout(r, DELAY_MS));
  }
  
  // Final save
  fs.writeFileSync(PAPERS_PATH, JSON.stringify(papers, null, 2), 'utf8');
  console.log(`\nDone! Updated: ${updated}, Failed: ${failed}, Total: ${papers.length}`);
}

main().catch(console.error);
