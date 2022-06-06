const db = require('../../db/connection');

// Function for retrieving all role data from the database. Combines data from role and department tables
const displayRoles = () => new Promise(resolve => {
    const sql = `SELECT title AS Role, salary AS Salary, department.name AS Department
                FROM role
                JOIN department ON role.department_id = department.id`;

    // Queries the database for all information pertaining to each employee
    db.query(sql, (err, rows) => {
        if (err) {
            return resolve(err.message);
        }
        console.table(rows);
        return resolve(rows);
    })
});

// Function for adding a new department to the database
const postRole = (role) => new Promise(resolve => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = role.getValues();
    
    // Queries the database, adding an entry into the role table based on the values of the role object passed into the function
    db.query(sql, params, (err, result) => {
        if (err) {
            ;
            return resolve(err.message);
        }
        return resolve('Added a new role.');
    });
})

// Function for retrieving the names of all roles and returning them in an array
const arrayOfRoles = () => new Promise(resolve => {
    const sql = `SELECT title FROM role`;
    // Sets up an array for storage
    const array = [];

    // Queries the database for all role names
    db.query(sql, (err, rows) => {
        if (err) {
            return ["There was a problem retrieving the roles. Please try again."];
        }
        // Adds the names of each department into the previously established array
        rows.forEach(element => {
            array.push(element.title);
        });
        return resolve(array);
    })
});

// Function for deriving the role ID from the role name
const getRoleId = (roleName) => new Promise(resolve => {
    const sql = `SELECT id FROM role WHERE title = ?`;
    const params = roleName;

    // Queries the database for a role ID using the role name passed into the function for matching
    db.query(sql, params, (err, rows) => {
        if (err) {
            return ["There was a problem retrieving the role ID. Please try again."];
        }
        return resolve(rows[0].id);
    })
})

// Function for updtating a role's department
const updateRoleDepartmentDb = (departmentId, roleId) => new Promise(resolve => {
    const sql = `UPDATE role SET
    department_id = ?
    WHERE id = ?`;
    const params = [departmentId, roleId];

    // Queries the database, altering the entry for the role based on the department and role ID's
    db.query(sql, params, (err, result) => {
        if (err) {
            return ["There was a problem updating the role. Please try again."];
        }
        return resolve('The role was successfully updated.');
    })
})

// Function for updtating a role's salary
const updateRoleSalaryDb = (salary, roleId) => new Promise(resolve => {
    const sql = `UPDATE role SET
    salary = ?
    WHERE id = ?`;
    const params = [salary, roleId];

    // Queries the database, altering the entry for the role based on the salary and role ID
    db.query(sql, params, (err, result) => {
        if (err) {
            return ["There was a problem updating the role. Please try again."];
        }
        return resolve('The role was successfully updated.');
    })
});

// Function for removing a role
const deleteRole = (roleName) => new Promise (resolve => {
    const sql = `DELETE FROM role WHERE title = ?`;
    const params = roleName;

    // Queries the database, and deletes based on the specified role name
    db.query(sql, params, (err, rows) => {
        return resolve('Deleted the ' + roleName + ' role');
    })
});

module.exports = {
    displayRoles,
    postRole,
    arrayOfRoles,
    getRoleId,
    updateRoleDepartmentDb,
    updateRoleSalaryDb,
    deleteRole
};