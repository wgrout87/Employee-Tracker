const db = require('../../db/connection');

// Function for retrieving all employee data from the database. Combines data from employee, role, and department tables
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

    // Queries the database for all information pertaining to each employee
    db.query(sql, (err, rows) => {
        if (err) {
            return resolve(err.message);
        }
        console.table(rows);
        return resolve(rows);
    })
});

// Function for retrieving the names of all managers and returning them in an array
const arrayOfManagers = () => new Promise (resolve => {
    const sql = `SELECT CONCAT(first_name, ' ', last_name) AS manager
    FROM employee
    WHERE manager_id IS NULL`;
    // Sets up an array for storage
    const array = [];

    // Queries the database for all employees with no manager (the implication being that they are themselves managers)
    db.query(sql, (err, rows) => {
        if (err) {
            return ["There was a problem retrieving the managers. Please try again."];
        }
        // Adds the names of each manager into the previously established array
        rows.forEach(element => {
            array.push(element.manager);
        });
        // Adds an extra option to choose if the employee is a manager (not under some other manager)
        array.push('None (This employee is a manager)');
        return resolve(array);
    })
});

// Function for deriving the employee ID from their full name
const getEmployeeId = (employeeName) => new Promise (resolve => {
    // This if statement will come into play in certain prompts where this string is the option chosen rather than a name
    if (employeeName === 'None (This employee is a manager)') {
        return resolve(null);
    }
    const sql = `SELECT id FROM employee
    WHERE CONCAT(first_name, ' ', last_name) = ?`;
    const params = employeeName;

    // Queries the database for an employee ID using the full name passed into the function for matching
    db.query(sql, params, (err, rows) => {
        if (err) {
            return "There was a problem retrieving the employee ID. Please try again.";
        }
        return resolve(rows[0].id);
    })
});

// Function for adding an employee to the database
const postEmployee = (employee) => new Promise(resolve => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = employee.getValues();

    // Queries the database, adding an entry into the employee table based on the values of the employee object passed into the function
    db.query(sql, params, (err, result) => {
        if (err) {
            return resolve(err.message);
        }
        return resolve('Added ' + employee.first_name + ' ' + employee.last_name + ' to the database.');
    });
})

// Function for retrieving the names of all employees and returning them in an array
const arrayOfEmployees = () => new Promise (resolve => {
    const sql = `SELECT CONCAT(first_name, ' ', last_name) AS employee FROM employee`;
    // Sets up an array for storage
    const array = [];

    // Queries the database for all employees, concatenating their first and last names
    db.query(sql, (err, rows) => {
        if (err) {
            return ["There was a problem retrieving the employees. Please try again."];
        }
        // Adds the names of each employee into the previously established array
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
    const params = [fieldId, employeeId];

    // Queries the database, updating an entry in the employee table based on the values passed into the function
    db.query(sql, params, (err, result) => {
        if (err) {
            return "There was a problem updating the employee's role. Please try again.";
        }
        return resolve('The employee was successfully updated.');
    })
});

// Function for displaying all employees using a passed in name to select for a specific manager
const displayEmployeesbyManager = (managerName) => new Promise (resolve => {
    const sql = `SELECT a.first_name AS 'First Name',
    a.last_name AS 'Last Name',
    CONCAT(b.first_name, ' ', b.last_name) AS 'Manager'
    FROM employee a
    LEFT JOIN employee b ON a.manager_id = b.id
    WHERE CONCAT(b.first_name, ' ', b.last_name) = ?`;
    const params = managerName;

    // Queries the database for any employees that have the manager with the specified name
    db.query(sql, params, (err, rows) => {
        if (err) {
            return "There was a problem retrieving the data. Please try again.";
        }
        return resolve(rows);
    })
});

// Function for displaying all employees using a passed in name to select for a specific department
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

    // Queries the database for any employees that work in the specified department
    db.query(sql, params, (err, rows) => {
        return resolve(rows);
    })
});

// Function for removing an employee
const deleteEmp = (employeeName) => new Promise (resolve => {
    const sql = `DELETE FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`;
    const params = employeeName;

    // Queries the database, and deletes based on the specified name
    db.query(sql, params, (err, rows) => {
        return resolve('Deleted ' + employeeName);
    })
})

module.exports = {
    displayEmployees,
    arrayOfManagers,
    getEmployeeId,
    postEmployee,
    arrayOfEmployees,
    updateEmployee,
    displayEmployeesbyManager,
    displayEmployeesbyDepartment,
    deleteEmp
};