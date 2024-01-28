const express = require('express');
const os = require("os");

const router = express.Router();

module.exports = () => {
  const hostname = os.hostname();

  router.get('/', (req, res) => {
    return res.json({ status: 'OK', hostname })
  });

  return router;
};
