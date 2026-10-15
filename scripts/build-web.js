// Copies the web app into www/, the folder Capacitor packages into the Android/iOS apps.
// The web files stay at the repo root so GitHub Pages can serve them as-is.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const out = path.join(root, 'www');
const files = ['index.html', 'style.css', 'app.js', 'manifest.json', 'sw.js', 'icon.svg', 'icons'];

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
for (const file of files) {
  fs.cpSync(path.join(root, file), path.join(out, file), { recursive: true });
}

console.log(`www/ pronto (${files.length} itens)`);
