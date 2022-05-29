-- SELECT a.first_name,
--     a.last_name,
--     b.first_name AS Manager   
--     FROM employee a, employee b
--     WHERE a.manager_id = b.id;

SELECT a.full_name AS 'Full Name',
    role.title AS 'Role',
    b.full_name AS 'Manager'
    FROM employee a
    LEFT JOIN role ON a.role_id = role.id
    LEFT JOIN employee b ON a.manager_id = b.id
    ORDER BY a.manager_id;