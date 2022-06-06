const db = require('../../db/connection');

// Function for retrieving all department data from the database
const displayDepartments = () => new Promise(resolve => {
    const sql = `SELECT name AS Departments FROM department`;
    
    // Queries the database for the name of each department
    db.query(sql, (err, rows) => {
        if (err) {
            return resolve(err.message);
        }
        console.table(rows);
        return resolve(rows);
    })
});

// Function for adding a new department to the database
const postDepartment = (department) => new Promise(resolve => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [department.name];
    
    // Queries the database, adding an entry into the department table based on the values of the department object passed into the function
    db.query(sql, params, (err, result) => {
        if (err) {
            return resolve(err.message);
        }
    });
    return resolve('Added the ' + department.name + ' department.');
});

// Function for retrieving the names of all departments and returning them in an array
const arrayOfDepartments = () => new Promise (resolve => {
    const sql = `SELECT name FROM department`;
    // Sets up an array for storage
    const array = [];

    // Queries the database for all department names
    db.query(sql, (err, rows) => {
        if (err) {
            return ["There was a problem retrieving the departments. Please try again."];
        }
        // Adds the names of each department into the previously established array
        rows.forEach(element => {
            array.push(element.name);
        });
        return resolve(array);
    })
});

// Function for deriving the department ID from the department name
const getDepartmentId = (departmentName) => new Promise (resolve => {
    const sql = `SELECT id FROM department WHERE name = ?`;
    const params = departmentName;

    // Queries the database for a department ID using the department name passed into the function for matching
    db.query(sql, params, (err, rows) => {
        if (err) {
            return ["There was a problem retrieving the department ID. Please try again."];
        }
        return resolve(rows[0].id);
    })
})

// Function for removing a department
const deleteDep = (departmentName) => new Promise (resolve => {
    const sql = `DELETE FROM department WHERE name = ?`;
    const params = departmentName;

    // Queries the database, and deletes based on the specified department name
    db.query(sql, params, (err, rows) => {
        if (rows) {
            return resolve('Deleted the ' + departmentName + ' department');
        }
    })
})

module.exports = {
    displayDepartments,
    postDepartment,
    arrayOfDepartments,
    getDepartmentId,
    deleteDep
};