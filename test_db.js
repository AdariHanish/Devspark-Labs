const mysql = require('mysql2/promise');
require('dotenv').config();

async function test() {
    console.log('Testing connection to:', process.env.DB_HOST);
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: { rejectUnauthorized: false }
        });
        console.log('✅ Success!');
        await conn.end();
    } catch (e) {
        console.error('❌ Error:', e.message);
    }
}
test();
