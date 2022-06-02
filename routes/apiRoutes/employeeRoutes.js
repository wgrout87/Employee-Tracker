const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

const displayEmployees = () => new Promise(resolve => {
    const sql = `SELECT a.id AS 'Employee ID',
    a.first_name AS 'First Name',
    a.last_name AS 'Last Name',
    role.title AS 'Job Title',
    department.name AS 'Department',
    role.salary AS 'Salary',
    CONCAT(b.first_name, ' ', b.last_name) AS 'Manager'
    FROM employee a
    LEFT JOIN role ON a.role_id = role.id
    LEFT JOIN employee b ON a.manager_id = b.id
    LEFT JOIN department ON department_id = department.id
    ORDER BY department_id;`;
    db.query(sql, (err, rows) => {
        if (err) {
            return resolve(err.message);
        }
        console.table(rows);
        return resolve(rows);
    })
});

const arrayOfManagers = () => new Promise (resolve => {
    const sql = `SELECT CONCAT(first_name, ' ', last_name) AS manager
    FROM employee
    WHERE manager_id IS NULL`;
    const array = [];

    db.query(sql, (err, rows) => {
        if (err) {
            return ["There was a problem retrieving the managers. Please try again."];
        }
        rows.forEach(element => {
            array.push(element.manager);
        });
        array.push('None (This employee is a manager)');
        return resolve(array);
    })
});

const getEmployeeId = (managerName) => new Promise (resolve => {
    if (managerName === 'None (This employee is a manager)') {
        return resolve(null);
    }
    const sql = `SELECT id FROM employee
    WHERE CONCAT(first_name, ' ', last_name) = ?`;
    const params = managerName;

    db.query(sql, params, (err, rows) => {
        if (err) {
            return ["There was a problem retrieving the manager ID. Please try again."];
        }
        return resolve(rows[0].id);
    })
});

const postEmployee = (employee) => new Promise(resolve => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = employee.getValues();
    db.query(sql, params, (err, result) => {
        if (err) {
            return resolve(err.message);
        }
        return resolve('Added a new employee.');
    });
})

const arrayOfEmployees = () => new Promise (resolve => {
    const sql = `SELECT CONCAT(first_name, ' ', last_name) AS employee FROM employee`;
    const array = [];

    db.query(sql, (err, rows) => {
        if (err) {
            return ["There was a problem retrieving the employees. Please try again."];
        }
        rows.forEach(element => {
            array.push(element.employee);
        });
        return resolve(array);
    })
});

// Function for updating an employee - will work as intended when field is either 'role' or 'manager'
const updateEmployee = (field, fieldId, employeeId) => new Promise (resolve => {
    const sql = `UPDATE employee SET
    ${field}_id = ?
    WHERE id = ?`;
    const array = [fieldId, employeeId];

    db.query(sql, array, (err, result) => {
        if (err) {
            return ["There was a problem updating the employee's role. Please try again."];
        }
        return resolve('The employee was successfully updated.');
    })
});

const displayEmployeesbyManager = (managerName) => new Promise (resolve => {
    const sql = `SELECT a.first_name AS 'First Name',
    a.last_name AS 'Last Name',
    CONCAT(b.first_name, ' ', b.last_name) AS 'Manager'
    FROM employee a
    LEFT JOIN employee b ON a.manager_id = b.id
    WHERE CONCAT(b.first_name, ' ', b.last_name) = ?`;
    const params = managerName;

    db.query(sql, params, (err, rows) => {
        return resolve(rows);
    })
});

const displayEmployeesbyDepartment = (departmentName) => new Promise (resolve => {
    const sql = `SELECT a.id AS 'Employee ID',
    a.first_name AS 'First Name',
    a.last_name AS 'Last Name',
    role.title AS 'Job Title',
    department.name AS 'Department',
    role.salary AS 'Salary',
    CONCAT(b.first_name, ' ', b.last_name) AS 'Manager'
    FROM employee a
    LEFT JOIN role ON a.role_id = role.id
    LEFT JOIN employee b ON a.manager_id = b.id
    LEFT JOIN department ON department_id = department.id
    WHERE department.name = ?
    ORDER BY department_id`;
    const params = departmentName;

    db.query(sql, params, (err, rows) => {
        return resolve(rows);
    })
});



// ROUTER OPTIONS FOR USE WITH A FRONT END
// GET all employees
router.get('/employees', (req, res) => {
    return displayEmployees()
        .then(data => res.json(data));
})

// POST an employee
router.post('/employees', ({ body }, res) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Employee added to database!\n'
        });
    });
});

// UPDATE (PUT) an employee
router.put('/employees/:id', (req, res) => {
    const sql = `UPDATE employee SET
        first_name = ?,
        last_name = ?,
        role_id = ?,
        manager_id = ?
        WHERE id = ?`;
    const params = [req.body.first_name, req.body.last_name, req.body.role_id, req.body.manager_id, req.params.id]
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Employee updated!\n'
        });
    })
})

module.exports = {
    employeeRoutes: router,
    displayEmployees,
    arrayOfManagers,
    getEmployeeId,
    postEmployee,
    arrayOfEmployees,
    updateEmployee,
    displayEmployeesbyManager,
    displayEmployeesbyDepartment
};