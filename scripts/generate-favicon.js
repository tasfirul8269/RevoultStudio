const fs = require('fs');
const path = require('path');

// Source and destination paths
const srcPath = path.join(__dirname, '../public/VerticalLogo.png');
const destPath = path.join(__dirname, '../public/favicon.ico');

// Copy the file
fs.copyFileSync(srcPath, destPath);

console.log('Favicon.ico has been created from VerticalLogo.png');
