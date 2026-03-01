const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * MIGRATION SCRIPT FOR TiDB CLOUD
 * This script connects to the NEW database and initializes the schema.
 */

async function migrate() {
    console.log('🚀 Starting TiDB Migration...');

    const config = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 4000,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: false // Required for TiDB
        },
        multipleStatements: true // Crucial for schema.sql
    };

    try {
        console.log(`📡 Connecting to ${config.host}:${config.port}...`);
        const connection = await mysql.createConnection(config);
        console.log('✅ Connected to TiDB.');

        const schemaFile = path.join(__dirname, 'database', 'schema.sql');
        console.log(`📄 Reading schema from ${schemaFile}...`);
        const schema = fs.readFileSync(schemaFile, 'utf8');

        // Note: multipleStatements: true allows executing the entire string at once
        console.log('🏗️  Applying schema and seeding data...');
        await connection.query(schema);

        console.log('🎉 Migration successful! Your database is ready.');
        await connection.end();
    } catch (err) {
        console.error('❌ Migration failed:', err.message);
        console.log('\n--- Troubleshooting ---');
        console.log('1. Ensure your .env has the NEW TiDB credentials.');
        console.log('2. Ensure your IP is whitelisted in TiDB Cloud console.');
        console.log('3. TiDB port is usually 4000 (not 3306).');
    }
}

migrate();
