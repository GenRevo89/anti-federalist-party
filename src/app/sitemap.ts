import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://anti-federalists.com';
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

  return routes;
}
