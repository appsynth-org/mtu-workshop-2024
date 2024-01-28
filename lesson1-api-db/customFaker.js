const Chance = require('chance');
const chance = new Chance();

// Add or modify chance methods as needed
chance.customMethod = () => {
  // Your custom logic here
  return 'Custom Result';
};

module.exports = chance;
