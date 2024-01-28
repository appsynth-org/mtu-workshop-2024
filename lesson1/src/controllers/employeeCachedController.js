const { getClient } = require('../cacheInit');
const EmployeeModel = require('../models/employeeModel');
const client = getClient();

exports.getEmployees = async (req, res) => {
  const cacheKey = req.originalUrl
  const { page, pageSize } = req.query;

  try {
    const data = await client.get(cacheKey);
    if (data) {
      return res.json(JSON.parse(data));
    }

    const employees = await EmployeeModel.getAllEmployees(page, pageSize);
    client.setEx(cacheKey, 60, JSON.stringify(employees));
    return res.json(employees);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  const cacheKey = req.originalUrl
  const { id } = req.params;

  try {
    const data = await client.get(cacheKey);
    if (data) {
      return res.json(JSON.parse(data));
    }

    const employees = await EmployeeModel.getById(id);
    if (employees.length === 0) {
      return res.status(404).json({ message: 'user not found' });
    }
    const employee = employees[0]
    client.setEx(cacheKey, 60, JSON.stringify(employee));
    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  const employeeData = req.body;

  try {
    const newEmployee = await EmployeeModel.createEmployee(employeeData);
    return res.status(201).json(newEmployee);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const employeeData = req.body;

  try {
    const updatedEmployee = await EmployeeModel.updateEmployee(id, employeeData);
    return res.json(updatedEmployee);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await EmployeeModel.deleteEmployee(req.params.id);
    return res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
