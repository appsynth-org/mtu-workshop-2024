const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

const initDatabase = async () => {
  try {
    // Create the 'employees' table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20),
        employee_type VARCHAR(50),
        join_date DATE,
        is_resigned BOOLEAN DEFAULT false
      );
    `);

    console.log('Initialized database schema');
    return { pool }
  } catch (error) {
    console.error('Error initializing database schema:', error.message);
  }
};

module.exports = { initDatabase, pool };
