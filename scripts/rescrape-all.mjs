/**
 * Re-scrape ALL papers with proper content extraction.
 * Fixes: opening salutations being cut off, line-fragment splitting.
 * 
 * Run: node scripts/rescrape-all.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAPERS_PATH = path.join(__dirname, '..', 'src', 'data', 'papers.json');
const DELAY_MS = 1500;

const papers = JSON.parse(fs.readFileSync(PAPERS_PATH, 'utf8'));

function getConstitutionOrgUrl(id) {
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

function toRoman(num) {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  let result = '';
  for (let i = 0; i < vals.length; i++) {
    while (num >= vals[i]) { result += syms[i]; num -= vals[i]; }
  }
  return result;
}

function getTAHUrl(id) {
  const match = id.match(/^(.+)-(\d+)$/);
  if (!match) return null;
  const [, author, num] = match;
  const roman = toRoman(parseInt(num)).toLowerCase();
  const slugMap = {
    'centinel': `centinel-${roman}`,
    'cato': `cato-${roman}`,
    'agrippa': `agrippa-${roman}`,
  };
  const slug = slugMap[author];
  if (!slug) return null;
  return `https://teachingamericanhistory.org/document/${slug}/`;
}

// Clean extraction — keep everything including salutations
function extractFromConstitutionOrg(html) {
  // Get body content
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let content = bodyMatch ? bodyMatch[1] : html;

  // Remove scripts, styles
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<style[\s\S]*?<\/style>/gi, '');

  // Remove the navigation links block at the bottom (Next | Previous | Contents | etc.)
  // These are usually in the last portion and contain links to other pages
  content = content.replace(/<a[^>]*>Next<\/a>[\s\S]*$/i, '');
  content = content.replace(/<a[^>]*>Prev(?:ious)?<\/a>[\s\S]*$/i, '');
  // Also remove standalone nav-like blocks at the end
  const lastAnchor = content.lastIndexOf('<a ');
  if (lastAnchor > content.length * 0.85) {
    content = content.substring(0, lastAnchor);
  }

  // Remove only the page title (h1/h2 that says "Brutus #1" etc.)
  // but keep h3, h4, h5, h6 (which contain salutations like "To the Citizens...")
  content = content.replace(/<h[12][^>]*>[\s\S]*?<\/h[12]>/gi, '');
  // Remove <hr> tags
  content = content.replace(/<hr[^>]*>/gi, '');

  // Convert block elements to paragraph breaks
  content = content
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n\n')
    .replace(/<\/blockquote>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/h[3456]>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')  // strip remaining tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&ldquo;/g, '\u201C')
    .replace(/&rdquo;/g, '\u201D')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/\r\n/g, '\n')
    .trim();

  // Now consolidate into real paragraphs
  return consolidateParagraphs(content);
}

function extractFromTAH(html) {
  // TAH puts content in entry-content div
  const entryMatch = html.match(/<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<\/article>|<footer)/i);
  let content = '';
  if (entryMatch) {
    content = entryMatch[1];
  } else {
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (articleMatch) content = articleMatch[1];
    else return null;
  }

  // Remove scripts, styles, share buttons
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<style[\s\S]*?<\/style>/gi, '');
  content = content.replace(/<div[^>]*class="[^"]*share[^"]*"[\s\S]*?<\/div>/gi, '');

  // Convert to text
  content = content
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/h[3456]>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/\r\n/g, '\n')
    .trim();

  return consolidateParagraphs(content);
}

function consolidateParagraphs(text) {
  // Split into lines, then merge short line fragments into real paragraphs
  const rawLines = text.split('\n');
  const lines = [];

  // First pass: collect non-empty lines, preserving double-newline gaps
  let prevEmpty = false;
  for (const line of rawLines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      if (!prevEmpty) lines.push('');
      prevEmpty = true;
    } else {
      lines.push(trimmed);
      prevEmpty = false;
    }
  }

  // Second pass: merge lines into paragraphs, splitting on blank lines
  const paragraphs = [];
  let current = '';
  for (const line of lines) {
    if (line === '') {
      if (current.trim()) paragraphs.push(current.trim());
      current = '';
    } else {
      if (current && !current.endsWith('-')) {
        current += ' ' + line;
      } else if (current && current.endsWith('-')) {
        current = current.slice(0, -1) + line;
      } else {
        current = line;
      }
    }
  }
  if (current.trim()) paragraphs.push(current.trim());

  // Filter out navigation artifacts, short junk
  const cleaned = paragraphs.filter(p => {
    if (p.length < 15) return false;
    if (/^(Next|Previous|Text Version|Contents|Home|Back|Search|Liberty Library)/.test(p)) return false;
    if (p.includes('constitution.org') || p.includes('Liberty Library')) return false;
    if (p.includes('teachingamericanhistory.org')) return false;
    if (/^Share (this|on)/.test(p)) return false;
    return true;
  });

  return cleaned.join('\n\n');
}

async function fetchUrl(url) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (educational research bot)' }
    });
    if (!response.ok) return null;
    return await response.text();
  } catch (err) {
    return null;
  }
}

async function main() {
  console.log(`Re-scraping all ${papers.length} papers with fixed extractor\n`);

  let updated = 0;
  let failed = 0;

  for (let i = 0; i < papers.length; i++) {
    const paper = papers[i];
    const match = paper.id.match(/^(.+)-(\d+)$/);
    if (!match) continue;
    const author = match[1];

    // Try constitution.org first
    const coUrl = getConstitutionOrgUrl(paper.id);
    if (coUrl) {
      console.log(`[${i + 1}/${papers.length}] ${paper.id} from constitution.org...`);
      const html = await fetchUrl(coUrl);
      if (html) {
        const content = extractFromConstitutionOrg(html);
        if (content && content.length > 200) {
          paper.content = content;
          updated++;
          console.log(`  ✓ ${content.length} chars, ${content.split('\n\n').length} paragraphs`);
          if (updated % 5 === 0) fs.writeFileSync(PAPERS_PATH, JSON.stringify(papers, null, 2), 'utf8');
          await new Promise(r => setTimeout(r, DELAY_MS));
          continue;
        }
      }
    }

    // Fallback to TAH
    const tahUrl = getTAHUrl(paper.id);
    if (tahUrl) {
      console.log(`[${i + 1}/${papers.length}] ${paper.id} from TAH...`);
      const html = await fetchUrl(tahUrl);
      if (html) {
        const content = extractFromTAH(html);
        if (content && content.length > 200) {
          paper.content = content;
          updated++;
          console.log(`  ✓ ${content.length} chars, ${content.split('\n\n').length} paragraphs`);
          if (updated % 5 === 0) fs.writeFileSync(PAPERS_PATH, JSON.stringify(papers, null, 2), 'utf8');
          await new Promise(r => setTimeout(r, DELAY_MS));
          continue;
        }
      }
    }

    console.log(`[${i + 1}/${papers.length}] ${paper.id} - FAILED from all sources`);
    failed++;
    await new Promise(r => setTimeout(r, DELAY_MS));
  }

  fs.writeFileSync(PAPERS_PATH, JSON.stringify(papers, null, 2), 'utf8');

  // Verification
  const b1 = papers[0];
  const paras = b1.content.split('\n\n');
  console.log(`\n=== DONE ===`);
  console.log(`Updated: ${updated}, Failed: ${failed}`);
  console.log(`\nBrutus #1 check:`);
  console.log(`  Starts with: "${b1.content.substring(0, 120)}"`);
  console.log(`  Paragraphs: ${paras.length}`);
}

main().catch(console.error);
