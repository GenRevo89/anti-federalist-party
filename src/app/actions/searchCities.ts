'use server';

import fs from 'fs';
import path from 'path';

export interface CityData {
  name: string;
  state: string;
  stateName: string;
  county: string;
  countySlug: string;
  slug: string;
}

let citiesCache: CityData[] | null = null;

function loadCities() {
  if (citiesCache) return citiesCache;
  try {
    const citiesPath = path.join(process.cwd(), 'src/data/all-cities.json');
    citiesCache = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));
  } catch (e) {
    citiesCache = [];
  }
  return citiesCache;
}

export async function searchCities(query: string): Promise<CityData[]> {
  const cities = loadCities();
  if (!cities) return [];

  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];

  const results = [];
  
  // Very simple fast scoring and prefix matching
  for (const city of cities) {
    const nameLower = city.name.toLowerCase();
    
    // exact match on name
    if (nameLower === q) {
      results.push({ ...city, score: 100 });
    }
    // starts with
    else if (nameLower.startsWith(q)) {
      results.push({ ...city, score: 50 });
    }
    // contains
    else if (nameLower.includes(q)) {
      results.push({ ...city, score: 10 });
    }
    // state match combined with city
    else if (`${nameLower}, ${city.state}`.includes(q) || `${nameLower}, ${city.stateName.toLowerCase()}`.includes(q)) {
      results.push({ ...city, score: 5 });
    }
  }

  // Sort by score descending, then by name
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.name.localeCompare(b.name);
  });

  // Strip internal score property before returning to client
  return results.slice(0, 30).map(c => ({
    name: c.name,
    state: c.state,
    stateName: c.stateName,
    county: c.county,
    countySlug: c.countySlug,
    slug: c.slug
  }));
}
