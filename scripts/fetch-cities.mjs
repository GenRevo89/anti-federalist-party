import fs from 'fs';
import https from 'https';
import path from 'path';

const URL = 'https://raw.githubusercontent.com/kelvins/US-Cities-Database/main/csv/us_cities.csv';

function downloadAndParse() {
  https.get(URL, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const lines = data.split('\n');
      const cities = [];
      
      const slugify = (str) => {
        if (!str) return '';
        return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      };

      // Regex to split CSV correctly, handling quotes
      const csvSplit = (line) => {
        const result = [];
        let cur = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          if (line[i] === '"') {
            inQuotes = !inQuotes;
          } else if (line[i] === ',' && !inQuotes) {
            result.push(cur.trim());
            cur = '';
          } else {
            cur += line[i];
          }
        }
        result.push(cur.trim());
        return result;
      };

      for(let i=1; i<lines.length; i++) {
        if(!lines[i].trim()) continue;
        
        // ID,STATE_CODE,STATE_NAME,CITY,COUNTY,LATITUDE,LONGITUDE
        const cols = csvSplit(lines[i]);
        if(cols.length >= 5) {
          const stateCode = cols[1].toLowerCase();
          const stateName = cols[2];
          const city = cols[3];
          const county = cols[4];
          
          if(!city || !stateCode) continue;

          cities.push({
            name: city,
            state: stateCode,
            stateName: stateName,
            county: county,
            countySlug: slugify(county.replace(/ County$/, '').replace(/ Parish$/, '')),
            slug: slugify(city)
          });
        }
      }
      
      // Keep only unique cities per state + county to prevent duplicates
      const uniqueCities = [];
      const seen = new Set();
      for(const c of cities) {
        const key = `${c.state}-${c.countySlug}-${c.slug}`;
        if(!seen.has(key)) {
          seen.add(key);
          uniqueCities.push(c);
        }
      }

      fs.writeFileSync('./src/data/all-cities.json', JSON.stringify(uniqueCities, null, 2));
      console.log(`Saved ${uniqueCities.length} cities to src/data/all-cities.json`);
    });
  }).on('error', err => {
    console.error("Error downloading file:", err.message);
  });
}

downloadAndParse();
