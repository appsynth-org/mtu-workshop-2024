const pgp = require('pg-promise')(); // Import pg-promise
const { initDatabase } = require('./src/dbInit');
const customFaker = require('./customFaker');

// Function to generate mock employee data
const generateMockEmployee = () => {
  return {
    name: customFaker.name(),
    position: customFaker.profession(),
    department: customFaker.word(),
    phone_number: customFaker.phone(),
    employee_type: customFaker.pickone(['Permanent', 'Outsource', 'Freelance']),
    join_date: customFaker.date({ year: new Date().getFullYear() - 5 }),
    is_resigned: customFaker.bool(),
  };
};

// Function to insert mock employees into the database
const insertMockEmployees = async (count, pool) => {
  console.time('generateMockEmployee')
  const employees = Array.from({ length: count }, generateMockEmployee);

  try {
    const query =
      pgp.helpers.insert(
        employees,
        ['name', 'position', 'department', 'phone_number', 'employee_type', 'join_date', 'is_resigned'],
        'employees'
      );

    await pool.query(query);
    console.log(`${count} mock employees inserted successfully.`);
  } catch (error) {
    console.error('Error inserting mock employees:', error.message);
  } finally {
    // Close the connection pool
    pool.end();
    console.timeEnd('generateMockEmployee')
  }
};

// Use an IIFE to execute the asynchronous code
(async () => {
  // Initialize the database and get the db object
  const { pool } = await initDatabase();

  // Change the value of 'employeeCount' to specify the number of mock employees to generate and insert
  const employeeCount = 1;
  insertMockEmployees(employeeCount, pool);
})();
