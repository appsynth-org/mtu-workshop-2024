const express = require('express');
const { getClient } = require('../cacheInit');
const employeeCachedController = require('../controllers/employeeCachedController');

const checkCache = async (req, res, next) => {
  const client = getClient();
  const url = req.originalUrl;
  const data = await client.get(url);
  if (!data) {
    return next();
  }
  return res.json(JSON.parse(data));
};

const router = express.Router();

module.exports = () => {
  router.get('/', checkCache, (req, res) => employeeCachedController.getEmployees(req, res));
  router.get('/:id', checkCache, (req, res) => employeeCachedController.getEmployeeById(req, res));
  router.post('/', (req, res) => employeeCachedController.createEmployee(req, res));
  router.put('/:id', (req, res) => employeeCachedController.updateEmployee(req, res));
  router.delete('/:id', (req, res) => employeeCachedController.deleteEmployee(req, res));

  return router;
};
