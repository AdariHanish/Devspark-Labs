require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function migrate() {
    console.log('Connecting to Aiven Cloud Database...');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME, // Usually 'defaultdb'
        ssl: { rejectUnauthorized: false },
        multipleStatements: true
    });

    console.log('Connected!');

    try {
        console.log(`Using database: ${process.env.DB_NAME}...`);

        console.log('Reading schema.sql...');
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing schema...');
        await connection.query(schema);
        console.log('✅ Success! Tables built and data inserted into Aiven Cloud.');
    } catch (err) {
        console.error('❌ Migration failed:', err.message);
    } finally {
        await connection.end();
        console.log('Connection closed.');
    }
}

migrate();
