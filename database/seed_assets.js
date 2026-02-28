require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function seedAssets() {
    console.log('🚀 Seeding assets to Aiven Cloud Database...');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: { rejectUnauthorized: false }
    });

    console.log('Connected!');

    const assets = [
        { name: 'logo', path: path.join(__dirname, '../public/images/logo.png'), mime: 'image/png' },
        { name: 'qr_code', path: path.join(__dirname, '../public/images/qr-code.png'), mime: 'image/png' }
    ];

    try {
        for (const asset of assets) {
            console.log(`Uploading ${asset.name}...`);
            if (fs.existsSync(asset.path)) {
                const data = fs.readFileSync(asset.path);
                await connection.query(
                    'INSERT INTO app_assets (asset_name, mime_type, data) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE mime_type = VALUES(mime_type), data = VALUES(data)',
                    [asset.name, asset.mime, data]
                );
                console.log(`✅ ${asset.name} uploaded successfully.`);
            } else {
                console.warn(`⚠️ Warning: ${asset.path} not found. Skipping.`);
            }
        }
        console.log('\n✨ Asset seeding complete!');
    } catch (err) {
        console.error('❌ Asset seeding failed:', err.message);
    } finally {
        await connection.end();
        console.log('Connection closed.');
    }
}

seedAssets();
