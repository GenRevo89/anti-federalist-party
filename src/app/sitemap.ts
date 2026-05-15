import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export async function generateSitemaps() {
  // We have 1 base sitemap and 4 city chunks for ~30k cities
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://anti-federalists.com';
  const routes: MetadataRoute.Sitemap = [];

  if (id === 0) {
    routes.push({
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    });
    
    routes.push({
      url: `${baseUrl}/manifesto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    });

    routes.push({
      url: `${baseUrl}/chapters`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    routes.push({
      url: `${baseUrl}/cities`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Compare pages
    const partySlugs = ['democrat', 'republican', 'libertarian', 'green', 'constitution', 'maga-movement', 'democratic-socialists', 'forward-party', 'no-labels', 'progressive-movement', 'reform-party'];
    const politicianSlugs = ['donald-trump', 'joe-biden', 'kamala-harris', 'ron-desantis', 'gavin-newsom', 'bernie-sanders', 'mitch-mcconnell', 'nancy-pelosi', 'aoc', 'ted-cruz', 'nikki-haley', 'jd-vance', 'elizabeth-warren', 'mike-pence', 'greg-abbott', 'rfk-jr'];

    routes.push({ url: `${baseUrl}/compare/parties`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 });
    routes.push({ url: `${baseUrl}/compare/politicians`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 });
    
    for (const slug of partySlugs) {
      routes.push({ url: `${baseUrl}/compare/parties/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 });
    }
    for (const slug of politicianSlugs) {
      routes.push({ url: `${baseUrl}/compare/politicians/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 });
    }

    // Founders pages
    const founderSlugs = ['patrick-henry', 'george-mason', 'brutus', 'federal-farmer', 'mercy-otis-warren', 'george-clinton', 'samuel-adams', 'luther-martin', 'thomas-jefferson', 'james-madison', 'george-washington', 'benjamin-franklin', 'thomas-paine'];
    routes.push({ url: `${baseUrl}/founders`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 });
    for (const slug of founderSlugs) {
      routes.push({ url: `${baseUrl}/founders/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 });
    }

    // Refutation page
    routes.push({ url: `${baseUrl}/refuting-the-federalist-papers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 });

    // Documents page
    routes.push({ url: `${baseUrl}/documents`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 });

    // State document pages
    const stateSlugs = ['alabama','alaska','arizona','arkansas','california','colorado','connecticut','delaware','florida','georgia','hawaii','idaho','illinois','indiana','iowa','kansas','kentucky','louisiana','maine','maryland','massachusetts','michigan','minnesota','mississippi','missouri','montana','nebraska','nevada','new-hampshire','new-jersey','new-mexico','new-york','north-carolina','north-dakota','ohio','oklahoma','oregon','pennsylvania','rhode-island','south-carolina','south-dakota','tennessee','texas','utah','vermont','virginia','washington','west-virginia','wisconsin','wyoming','district-of-columbia'];
    for (const slug of stateSlugs) {
      routes.push({ url: `${baseUrl}/documents/states/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
    }

    try {
      const papersPath = path.join(process.cwd(), 'src/data/papers.json');
      const papers = JSON.parse(fs.readFileSync(papersPath, 'utf8'));
      papers.forEach((paper: any) => {
        routes.push({
          url: `${baseUrl}/library/papers/${paper.id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      });
    } catch (e) {}

    try {
      const countiesPath = path.join(process.cwd(), 'src/data/all-counties.json');
      const counties = JSON.parse(fs.readFileSync(countiesPath, 'utf8'));
      counties.forEach((county: any) => {
        routes.push({
          url: `${baseUrl}/chapters/${county.state}/${county.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    } catch (e) {}

    return routes;
  }

  // Handle cities for ids 1, 2, 3, 4 (10k chunking)
  try {
    const citiesPath = path.join(process.cwd(), 'src/data/all-cities.json');
    const cities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));
    
    const CHUNK_SIZE = 10000;
    const startIndex = (id - 1) * CHUNK_SIZE;
    const chunk = cities.slice(startIndex, startIndex + CHUNK_SIZE);
    
    chunk.forEach((city: any) => {
      routes.push({
        url: `${baseUrl}/chapters/${city.state}/${city.countySlug}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  } catch (e) {}

  return routes;
}
