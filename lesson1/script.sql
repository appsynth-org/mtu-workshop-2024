INSERT INTO todos (name, description)
SELECT
  first_names.name,
  job_title
FROM
  (SELECT unnest(ARRAY['John', 'Jane', 'Robert', 'Emily', 'Michael', 'Olivia', 'William', 'Sophia', 'Daniel', 'Emma']) AS name) AS first_names,
  unnest(ARRAY['Software Engineer', 'Project Manager', 'Data Analyst', 'Marketing Specialist', 'Accountant', 'HR Manager', 'Sales Representative', 'Graphic Designer', 'Customer Support', 'Research Scientist']) AS job_title
CROSS JOIN generate_series(1, 100)
ORDER BY random();