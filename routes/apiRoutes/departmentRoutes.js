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
    postDepartment
};