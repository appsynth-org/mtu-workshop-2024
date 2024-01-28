const { createClient } = require('redis')

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
})

const initCacheDatabase = async () => {
  try {
    await client.connect();
    console.log('Initialized cache database')

    return { client }
  } catch (error) {
    console.error('Error initializing cache database:', error.message);
  }
};

const getClient = () => client

module.exports = { initCacheDatabase, getClient };
