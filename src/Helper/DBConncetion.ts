const { Client } = require('pg');

const connectDB = async () => {
    const client = new Client({
        user: 'postgres', // Update with your PostgreSQL user
        host: 'localhost',
        database: 'testing_medpredit', // Your PostgreSQL database
        password: '1009', // PostgreSQL password
        port: 5432, // Default port for PostgreSQL
    });

    await client.connect();
    // console.log("PostgreSQL database connected successfully!");

    return client;
};

module.exports = connectDB;
