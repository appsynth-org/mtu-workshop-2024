const { initDatabase } = require('./dbInit');

const initializeSchema = async () => {
  const { db } = await initDatabase();

  try {
    // Create tables and perform other schema-related tasks
    await db.none(`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255),
        department VARCHAR(255),
        phone_number VARCHAR(20),
        employee_type VARCHAR(20),
        join_date DATE,
        is_resigned BOOLEAN
      );
    `);

    console.log('Database schema initialized successfully.');
  } catch (error) {
    console.error('Error initializing database schema:', error.message);
  } finally {
    // Close the connection pool
    db.$pool.end();
  }
};

initializeSchema();
