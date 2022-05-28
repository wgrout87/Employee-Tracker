const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// GET all employees
router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    })
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

module.exports = router;