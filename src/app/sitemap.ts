import { MetadataRoute } from 'next';
import allCounties from '@/data/all-counties.json';
import allCities from '@/data/all-cities.json';
import papers from '@/data/papers.json';

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
  routes.push({ url: `${baseUrl}/transparency`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 });

  // ─── Compare: Parties ───
  for (const slug of ['democrat','republican','libertarian','green','constitution','maga-movement','democratic-socialists','forward-party','no-labels','progressive-movement','reform-party']) {
    routes.push({ url: `${baseUrl}/compare/parties/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 });
  }

  // ─── Compare: Politicians ───
  for (const slug of ['donald-trump','joe-biden','kamala-harris','ron-desantis','gavin-newsom','bernie-sanders','mitch-mcconnell','nancy-pelosi','aoc','ted-cruz','nikki-haley','jd-vance','elizabeth-warren','mike-pence','greg-abbott','rfk-jr']) {
    routes.push({ url: `${baseUrl}/compare/politicians/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 });
  }

  // ─── Founders ───
  for (const slug of ['patrick-henry','george-mason','brutus','federal-farmer','mercy-otis-warren','george-clinton','samuel-adams','luther-martin','thomas-jefferson','james-madison','george-washington','benjamin-franklin','thomas-paine']) {
    routes.push({ url: `${baseUrl}/founders/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 });
  }

  // ─── State document pages ───
  for (const slug of ['alabama','alaska','arizona','arkansas','california','colorado','connecticut','delaware','florida','georgia','hawaii','idaho','illinois','indiana','iowa','kansas','kentucky','louisiana','maine','maryland','massachusetts','michigan','minnesota','mississippi','missouri','montana','nebraska','nevada','new-hampshire','new-jersey','new-mexico','new-york','north-carolina','north-dakota','ohio','oklahoma','oregon','pennsylvania','rhode-island','south-carolina','south-dakota','tennessee','texas','utah','vermont','virginia','washington','west-virginia','wisconsin','wyoming','district-of-columbia']) {
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

  // ─── All ~30,000 cities ───
  for (const city of allCities as any[]) {
    routes.push({ url: `${baseUrl}/chapters/${city.state}/${city.countySlug}/${city.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 });
  }

  return routes;
}
