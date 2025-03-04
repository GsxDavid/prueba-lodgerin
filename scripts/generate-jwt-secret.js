const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Ruta del archivo .env
const envPath = path.join(__dirname, '../.env');

// Generar un JWT_SECRET seguro
const newSecret = crypto.randomBytes(32).toString('hex');

// Leer el archivo .env
if (!fs.existsSync(envPath)) {
    console.error("Archivo .env no encontrado.");
    process.exit(1);
}

let envContent = fs.readFileSync(envPath, 'utf8');

if (envContent.includes('JWT_SECRET=')) {
    envContent = envContent.replace(/^JWT_SECRET=.*/m, `JWT_SECRET=${newSecret}`);
} else {
    envContent += `\nJWT_SECRET=${newSecret}`;
}

fs.writeFileSync(envPath, envContent);

console.log(`JWT_SECRET generado y actualizado en .env`);
