const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// GET all departments
router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    })
})

// POST a department
router.post('/departments', ({ body }, res) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [body.name];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Department added to database!\n'
        });
    });
});

module.exports = router;