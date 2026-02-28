require('dotenv').config();
const mysql = require('mysql2/promise');

async function verifyData() {
    console.log('Connecting to Aiven Cloud Database for verification...');
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: { rejectUnauthorized: false }
        });

        console.log('Connected!');

        console.log('Checking tables...');
        const [tables] = await connection.query("SHOW TABLES;");
        console.log('Tables found:', tables.map(t => Object.values(t)[0]).join(', '));

        const [projectRows] = await connection.query('SELECT COUNT(*) as count FROM projects');
        const [reviewRows] = await connection.query('SELECT COUNT(*) as count FROM reviews');

        console.log(`📊 Current Cloud Data Status:`);
        console.log(`✅ Projects count: ${projectRows[0].count}`);
        console.log(`✅ Reviews count: ${reviewRows[0].count}`);

        if (projectRows[0].count > 0 && reviewRows[0].count > 0) {
            console.log('\n✨ Database is correctly populated and ready!');
        } else {
            console.log('\n⚠️ Database is connected but appears empty.');
        }

        await connection.end();
    } catch (err) {
        console.error('❌ Verification failed:', err.message);
    }
}

verifyData();
