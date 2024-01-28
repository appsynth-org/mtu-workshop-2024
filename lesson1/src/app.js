const express = require('express');
const publicRoutes = require('./routes/publicRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const employeeCachedRoutes = require('./routes/employeeCachedRoutes')
const { initDatabase } = require('./dbInit');
const { initCacheDatabase } = require('./cacheInit');

const app = express();

async function startServer() {
  try {
    await initDatabase();
    await initCacheDatabase();

    app.use(express.json());

    app.use('/', publicRoutes());
    app.use('/api/employees', employeeRoutes());
    app.use('/api/cached/employees', employeeCachedRoutes());

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing the database:', error);
    process.exit(1); // Exit the application on database initialization failure
  }
}

startServer();
