import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = path.dirname(fileURLToPath(import.meta.url));

const cover = `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225" role="img" aria-labelledby="title desc">
  <title id="title">MealGiver Vibe96 cover</title>
  <desc id="desc">MealGiver showcases a food donation marketplace connecting restaurants, charities, and communities.</desc>
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#ecfdf5"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <linearGradient id="card" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#166534"/>
    </linearGradient>
  </defs>
  <rect width="400" height="225" fill="url(#bg)"/>
  <circle cx="70" cy="40" r="32" fill="#dcfce7"/>
  <circle cx="330" cy="170" r="40" fill="#fff7ed"/>
  <rect x="24" y="24" width="78" height="24" rx="10" fill="#0f172a"/>
  <text x="44" y="40" fill="#ffffff" font-size="10" font-weight="700" font-family="Segoe UI, Arial, sans-serif">MEALGIVER</text>
  <text x="24" y="82" fill="#111827" font-size="26" font-weight="800" font-family="Segoe UI, Arial, sans-serif">Turn surplus</text>
  <text x="24" y="108" fill="#111827" font-size="26" font-weight="800" font-family="Segoe UI, Arial, sans-serif">food into hope</text>
  <text x="24" y="128" fill="#4b5563" font-size="10" font-family="Segoe UI, Arial, sans-serif">Restaurant • Charity • Community</text>
  <rect x="24" y="145" width="116" height="28" rx="14" fill="url(#card)"/>
  <text x="40" y="163" fill="#ffffff" font-size="11" font-weight="700" font-family="Segoe UI, Arial, sans-serif">Explore Platform</text>
  <g transform="translate(255 45)">
    <rect width="105" height="118" rx="16" fill="#ffffff" stroke="#d1fae5"/>
    <rect x="12" y="12" width="81" height="58" rx="10" fill="#ecfdf5"/>
    <rect x="18" y="22" width="26" height="22" rx="6" fill="#10b981"/>
    <rect x="48" y="22" width="32" height="8" rx="4" fill="#86efac"/>
    <rect x="48" y="34" width="24" height="8" rx="4" fill="#bbf7d0"/>
    <rect x="18" y="82" width="66" height="8" rx="4" fill="#d1fae5"/>
    <rect x="18" y="96" width="51" height="8" rx="4" fill="#d1fae5"/>
  </g>
</svg>
`;

const square = `
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080" role="img" aria-labelledby="title desc">
  <title id="title">MealGiver square landing page</title>
  <desc id="desc">MealGiver's square landing graphic showing food donation, dashboard, and community impact.</desc>
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#ecfdf5"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <linearGradient id="primary" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#166534"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <circle cx="170" cy="180" r="120" fill="#dcfce7"/>
  <circle cx="900" cy="850" r="160" fill="#fff7ed"/>
  <rect x="84" y="84" width="200" height="58" rx="20" fill="#0f172a"/>
  <text x="126" y="122" fill="#ffffff" font-size="30" font-weight="700" font-family="Segoe UI, Arial, sans-serif">MEALGIVER</text>
  <text x="84" y="306" fill="#111827" font-size="96" font-weight="900" font-family="Segoe UI, Arial, sans-serif">Turn Surplus</text>
  <text x="84" y="408" fill="#111827" font-size="96" font-weight="900" font-family="Segoe UI, Arial, sans-serif">Food Into Hope</text>
  <text x="84" y="470" fill="#475569" font-size="30" font-family="Segoe UI, Arial, sans-serif">Connecting restaurants, charities and communities.</text>
  <rect x="84" y="520" width="250" height="68" rx="34" fill="url(#primary)"/>
  <text x="160" y="565" fill="#ffffff" font-size="26" font-weight="700" font-family="Segoe UI, Arial, sans-serif">Explore</text>
  <g transform="translate(638 230)">
    <rect width="320" height="430" rx="28" fill="#ffffff" stroke="#d1fae5" stroke-width="3"/>
    <rect x="26" y="30" width="268" height="154" rx="18" fill="#ecfdf5"/>
    <rect x="44" y="52" width="92" height="56" rx="16" fill="#10b981"/>
    <rect x="150" y="58" width="112" height="18" rx="9" fill="#a7f3d0"/>
    <rect x="150" y="84" width="90" height="18" rx="9" fill="#d1fae5"/>
    <rect x="150" y="110" width="98" height="18" rx="9" fill="#d1fae5"/>
    <rect x="34" y="212" width="252" height="56" rx="16" fill="#f8fafc"/>
    <rect x="48" y="228" width="120" height="18" rx="9" fill="#d1fae5"/>
    <rect x="178" y="228" width="86" height="18" rx="9" fill="#bbf7d0"/>
    <rect x="34" y="290" width="252" height="56" rx="16" fill="#f8fafc"/>
    <rect x="48" y="306" width="110" height="18" rx="9" fill="#d1fae5"/>
    <rect x="170" y="306" width="98" height="18" rx="9" fill="#bbf7d0"/>
    <rect x="34" y="368" width="252" height="42" rx="18" fill="#0f172a"/>
    <text x="120" y="397" fill="#ffffff" font-size="20" font-weight="700" font-family="Segoe UI, Arial, sans-serif">Live impact</text>
  </g>
  <g fill="#10b981" font-size="28" font-weight="700" font-family="Segoe UI, Arial, sans-serif">
    <text x="84" y="810">Restaurants</text>
    <text x="392" y="810">Charities</text>
    <text x="704" y="810">Individuals</text>
  </g>
</svg>
`;

const files = {
  'cover-400x225.svg': cover,
  'landing-square-1080x1080.svg': square,
};

for (const [fileName, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(outDir, fileName), content.trim() + '\n', 'utf8');
}

console.log('Wrote Vibe96 SVG assets to', outDir);
