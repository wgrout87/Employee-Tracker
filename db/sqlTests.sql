-- SELECT a.id AS 'Employee ID',
--     a.first_name AS 'First Name',
--     a.last_name AS 'Last Name',
--     role.title AS 'Job Title',
--     department.name AS 'Department',
--     role.salary AS 'Salary',
--     CONCAT(b.first_name, ' ', b.last_name) AS 'Manager'
--     FROM employee a
--     LEFT JOIN role ON a.role_id = role.id
--     LEFT JOIN employee b ON a.manager_id = b.id
--     LEFT JOIN department ON department_id = department.id
--     ORDER BY department_id;

SELECT CONCAT(first_name, ' ', last_name) AS manager
    FROM employee
    WHERE manager_id IS NULL;

-- SELECT id FROM employee
--     WHERE CONCAT(first_name, ' ', last_name) = 'Peter Greenaway';