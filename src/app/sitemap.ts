import { MetadataRoute } from 'next';
import allCounties from '@/data/all-counties.json';
import allCities from '@/data/all-cities.json';
import papers from '@/data/papers.json';

export async function generateSitemaps() {
  const cityChunks = Math.ceil((allCities as any[]).length / 10000);
  const ids = [{ id: 0 }];
  for (let i = 1; i <= cityChunks; i++) ids.push({ id: i });
  return ids;
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://anti-federalists.com';

  // ═══════════════════════════════════════════
  // SITEMAP 0: All core + county routes
  // ═══════════════════════════════════════════
  if (id === 0) {
    const routes: MetadataRoute.Sitemap = [];

    // ─── Core pages ───
    routes.push({ url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 });
    routes.push({ url: `${baseUrl}/manifesto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 });
    routes.push({ url: `${baseUrl}/chapters`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 });
    routes.push({ url: `${baseUrl}/cities`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 });
    routes.push({ url: `${baseUrl}/documents`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 });
    routes.push({ url: `${baseUrl}/founders`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 });
    routes.push({ url: `${baseUrl}/refuting-the-federalist-papers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 });
    routes.push({ url: `${baseUrl}/library/papers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 });
    routes.push({ url: `${baseUrl}/compare/parties`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 });
    routes.push({ url: `${baseUrl}/compare/politicians`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 });

    // ─── Compare: Parties ───
    const partySlugs = ['democrat', 'republican', 'libertarian', 'green', 'constitution', 'maga-movement', 'democratic-socialists', 'forward-party', 'no-labels', 'progressive-movement', 'reform-party'];
    for (const slug of partySlugs) {
      routes.push({ url: `${baseUrl}/compare/parties/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 });
    }

    // ─── Compare: Politicians ───
    const politicianSlugs = ['donald-trump', 'joe-biden', 'kamala-harris', 'ron-desantis', 'gavin-newsom', 'bernie-sanders', 'mitch-mcconnell', 'nancy-pelosi', 'aoc', 'ted-cruz', 'nikki-haley', 'jd-vance', 'elizabeth-warren', 'mike-pence', 'greg-abbott', 'rfk-jr'];
    for (const slug of politicianSlugs) {
      routes.push({ url: `${baseUrl}/compare/politicians/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 });
    }

    // ─── Founders ───
    const founderSlugs = ['patrick-henry', 'george-mason', 'brutus', 'federal-farmer', 'mercy-otis-warren', 'george-clinton', 'samuel-adams', 'luther-martin', 'thomas-jefferson', 'james-madison', 'george-washington', 'benjamin-franklin', 'thomas-paine'];
    for (const slug of founderSlugs) {
      routes.push({ url: `${baseUrl}/founders/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 });
    }

    // ─── State document pages ───
    const stateSlugs = ['alabama','alaska','arizona','arkansas','california','colorado','connecticut','delaware','florida','georgia','hawaii','idaho','illinois','indiana','iowa','kansas','kentucky','louisiana','maine','maryland','massachusetts','michigan','minnesota','mississippi','missouri','montana','nebraska','nevada','new-hampshire','new-jersey','new-mexico','new-york','north-carolina','north-dakota','ohio','oklahoma','oregon','pennsylvania','rhode-island','south-carolina','south-dakota','tennessee','texas','utah','vermont','virginia','washington','west-virginia','wisconsin','wyoming','district-of-columbia'];
    for (const slug of stateSlugs) {
      routes.push({ url: `${baseUrl}/documents/states/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
    }

    // ─── Anti-Federalist Papers ───
    for (const paper of papers as any[]) {
      routes.push({ url: `${baseUrl}/library/papers/${paper.id}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
    }

    // ─── All 3,216 counties ───
    for (const county of allCounties as any[]) {
      routes.push({ url: `${baseUrl}/chapters/${county.state}/${county.slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
    }

    return routes;
  }

  // ═══════════════════════════════════════════
  // SITEMAPS 1-N: City chunks (10,000 per sitemap)
  // ═══════════════════════════════════════════
  const cities = allCities as any[];
  const CHUNK_SIZE = 10000;
  const startIndex = (id - 1) * CHUNK_SIZE;
  const chunk = cities.slice(startIndex, startIndex + CHUNK_SIZE);

  return chunk.map((city: any) => ({
    url: `${baseUrl}/chapters/${city.state}/${city.countySlug}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
}
