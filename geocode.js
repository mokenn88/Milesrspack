const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');

// === CONFIG ===
const API_KEY = 'AIzaSyAWhAdUPFChnGrwhywbhMSAZN84_OO68Zg'; // Replace with your key
const INPUT_CSV = './pubs.csv';
const OUTPUT_JSON = './pubs.json';

const pubs = [];

function buildAddress(pub) {
  return `${pub.Address}, ${pub.City}, ${pub.State}`;
}

async function geocodeAddress(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
  const response = await axios.get(url);
  if (response.data.status === 'OK') {
    const loc = response.data.results[0].geometry.location;
    return { lat: loc.lat, lng: loc.lng };
  } else {
    console.warn(`⚠️ Geocode failed for ${address}: ${response.data.status}`);
    return { lat: null, lng: null };
  }
}

async function processPubs() {
  console.log("🚀 Running processPubs()...");

  const results = [];

  for (let i = 0; i < pubs.length; i++) {
    const pub = pubs[i];
    const fullAddress = buildAddress(pub);
    console.log(`🔎 [${i + 1}/${pubs.length}] ${pub.Name} → ${fullAddress}`);

    try {
      const coords = await geocodeAddress(fullAddress);
      results.push({
        name: pub.Name,
        address: fullAddress,
        lat: coords.lat,
        lng: coords.lng,
        tags: pub['*Status'] ? [pub['*Status']] : []
      });
    } catch (err) {
      console.error(`❌ Error geocoding ${pub.Name}: ${err.message}`);
    }

    await new Promise(res => setTimeout(res, 200)); // rate limiting
  }

  const valid = results.filter(p => p.lat && p.lng);
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(valid, null, 2));
  console.log(`✅ Done! Saved ${valid.length} pubs to ${OUTPUT_JSON}`);
}

// === ENTRY POINT ===
console.log("🚀 Script started...");

fs.createReadStream(INPUT_CSV)
  .pipe(csv())
  .on('data', (row) => pubs.push(row))
  .on('end', () => {
    console.log(`✅ Loaded ${pubs.length} rows`);
    console.log(pubs.slice(0, 3)); // You can remove this line later
    processPubs(); // 💥 THIS is what triggers geocoding
  })
  .on('error', (err) => {
    console.error("❌ CSV Read Error:", err.message);
  });
