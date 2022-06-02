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
        return resolve('Added a new role.');
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
});

const getRoleId = (roleName) => new Promise (resolve => {
    const sql = `SELECT id FROM role WHERE title = ?`;
    const params = roleName;

    db.query(sql, params, (err, rows) => {
        if (err) {
            return ["There was a problem retrieving the role ID. Please try again."];
        }
        return resolve(rows[0].id);
    })
})

module.exports = {
    displayRoles,
    postRole,
    arrayOfRoles,
    getRoleId
};