const { createClient } = require('redis')

const client = createClient()

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
