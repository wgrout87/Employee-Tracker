const express = require('express');
const router = express.Router();
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

const departmentId = (departmentName) => new Promise (resolve => {
    const sql = `SELECT id FROM department WHERE name = ?`;
    const params = departmentName;

    db.query(sql, params, (err, rows) => {
        if (err) {
            return ["There was a problem retrieving the roles. Please try again."];
        }
        return resolve(rows[0].id);
    })
})

// GET all departments
router.get('/departments', (req, res) => {
    return displayDepartments()
        .then(data => res.json(data));
})

// POST a department
router.post('/departments', ({ body }, res) => {
    postDepartment(body).then(data => {
        res.json({
            message: data
        });
    })
});

module.exports = {
    departmentRoutes: router,
    displayDepartments,
    postDepartment,
    arrayOfDepartments,
    departmentId
};