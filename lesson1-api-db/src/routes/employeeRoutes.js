const express = require('express');
const { getClient } = require('../cacheInit');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => employeeController.getEmployees(req, res));
  router.get('/:id', (req, res) => employeeController.getEmployeeById(req, res));
  router.post('/', (req, res) => employeeController.createEmployee(req, res));
  router.put('/:id', (req, res) => employeeController.updateEmployee(req, res));
  router.delete('/:id', (req, res) => employeeController.deleteEmployee(req, res));

  return router;
};
