import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneWrapper from "@/components/SceneWrapper";
import CitySearch from "@/components/CitySearch";
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'National Municipal Directory | Anti-Federalist Party',
  description: 'Search for your local municipal chapter. We are active in over 30,000 cities and towns across the nation.',
};

const TOP_CITIES = [
  { name: 'New York', state: 'ny' },
  { name: 'Los Angeles', state: 'ca' },
  { name: 'Chicago', state: 'il' },
  { name: 'Houston', state: 'tx' },
  { name: 'Phoenix', state: 'az' },
  { name: 'Philadelphia', state: 'pa' },
  { name: 'San Antonio', state: 'tx' },
  { name: 'San Diego', state: 'ca' },
  { name: 'Dallas', state: 'tx' },
  { name: 'Austin', state: 'tx' },
  { name: 'Jacksonville', state: 'fl' },
  { name: 'San Jose', state: 'ca' },
  { name: 'Fort Worth', state: 'tx' },
  { name: 'Columbus', state: 'oh' },
  { name: 'Charlotte', state: 'nc' },
  { name: 'Indianapolis', state: 'in' },
  { name: 'San Francisco', state: 'ca' },
  { name: 'Seattle', state: 'wa' },
  { name: 'Denver', state: 'co' },
  { name: 'Washington', state: 'dc' },
  { name: 'Boston', state: 'ma' },
  { name: 'El Paso', state: 'tx' },
  { name: 'Nashville', state: 'tn' },
  { name: 'Oklahoma City', state: 'ok' },
  { name: 'Las Vegas', state: 'nv' },
  { name: 'Portland', state: 'or' },
  { name: 'Detroit', state: 'mi' },
  { name: 'Memphis', state: 'tn' },
  { name: 'Louisville', state: 'ky' },
  { name: 'Baltimore', state: 'md' }
];

export default async function CitiesIndex() {
  const citiesPath = path.join(process.cwd(), 'src/data/all-cities.json');
  let defaultCities: any[] = [];
  try {
    const allCities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));
    
    // Find matching cities for top 30
    for (const top of TOP_CITIES) {
      const match = allCities.find((c: any) => c.name.toLowerCase() === top.name.toLowerCase() && c.state === top.state);
      if (match) defaultCities.push(match);
    }
  } catch (e) {
    console.error("Could not load top cities");
  }

  return (
    <SceneWrapper theme="chapters">
      <Navbar />
      <main className="relative z-10" style={{ background: 'transparent' }}>
        <CitySearch defaultCities={defaultCities} />
      </main>
      <Footer />
    </SceneWrapper>
  );
}
