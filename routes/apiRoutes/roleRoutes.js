const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

const displayRoles = () => new Promise (resolve => {
    const sql = `SELECT title AS Role, salary AS Salary, department.name AS Department
                FROM role
                JOIN department ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            return resolve(err.message);
        }
        console.table(rows);
        return resolve(rows);
    })
});

const postRole = (role) => new Promise (resolve => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = role.getValues();
    db.query(sql, params, (err, result) => {
        if (err) {;
            return resolve(err.message);
        }
        return resolve(result);
    });
})

const arrayOfRoles = () => new Promise (resolve => {
    const sql = `SELECT title FROM role`;
    const array = [];

    db.query(sql, (err, rows) => {
        if (err) {
            return ["There was a problem retrieving the roles. Please try again."];
        }
        rows.forEach(element => {
            array.push(element.title);
        });
        return resolve(array);
    })
})

// GET all roles
router.get('/roles', (req, res) => {
    return displayRoles()
        .then(data => res.json(data));
})

// POST a role
router.post('/roles', ({ body }, res) => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [body.title, body.salary, body.department_id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Role added to database!\n'
        });
    });
});

module.exports = {
    roleRoutes: router,
    displayRoles,
    postRole,
    arrayOfRoles
};