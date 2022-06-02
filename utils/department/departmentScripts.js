const db = require('../../db/connection');

const displayDepartments = () => new Promise(resolve => {
    const sql = `SELECT name AS Departments FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            return resolve(err.message);
        }
        console.table(rows);
        return resolve(rows);
    })
});

const postDepartment = (department) => new Promise(resolve => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [department.name];
    db.query(sql, params, (err, result) => {
        if (err) {
            return resolve(err.message);
        }
    });
    return resolve('Added a new department.');
});

const arrayOfDepartments = () => new Promise (resolve => {
    const sql = `SELECT name FROM department`;
    const array = [];

    db.query(sql, (err, rows) => {
        if (err) {
            return ["There was a problem retrieving the departments. Please try again."];
        }
        rows.forEach(element => {
            array.push(element.name);
        });
        return resolve(array);
    })
});

const getDepartmentId = (departmentName) => new Promise (resolve => {
    const sql = `SELECT id FROM department WHERE name = ?`;
    const params = departmentName;

    db.query(sql, params, (err, rows) => {
        if (err) {
            return ["There was a problem retrieving the department ID. Please try again."];
        }
        return resolve(rows[0].id);
    })
})

const deleteDep = (departmentName) => new Promise (resolve => {
    const sql = `DELETE FROM department WHERE name = ?`;
    const params = departmentName;

    db.query(sql, params, (err, rows) => {
        return resolve('Deleted the ' + departmentName + ' department');
    })
})

module.exports = {
    displayDepartments,
    postDepartment,
    arrayOfDepartments,
    getDepartmentId,
    deleteDep
};