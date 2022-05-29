const inquirer = require('inquirer');
const db = require('./db/connection')
const Department = require('./utils/Department');
const Employee = require('./utils/Employee');
const Role = require('./utils/Role');
const { displayDepartments, postDepartment } = require('./routes/apiRoutes/departmentRoutes');
// const {  } = require('./routes/apiRoutes/roleRoutes');
const { displayEmployees } = require('./routes/apiRoutes/employeeRoutes');
const res = require('express/lib/response');

// Object containing all of the prompt text
const prompts = {
    options: 'What would you like to do?',
    departments: 'View all departments',
    roles: 'View all roles',
    employees: 'View all employees',
    addDepartment: 'Add a department',
    addDepartmentOptions: {
        name: 'What is the name of the new department? (1-30 Characters)'
    },
    addRole: 'Add a role',
    addRoleOptions: {
        title: 'What is the new role? (1-30 Characters)',
        salary: 'What is the salary for the new role? (Must be a number)',
        department: 'What is the department for the new role?'
    },
    addEmployee: 'Add an employee',
    addEmployeeOptions: {
        firstName: 'What is the employee\'s first name? (1-30 Characters)',
        lastName: 'What is the employee\'s last name? (1-30 Characters)',
        role: 'What is the employee\'s role?',
        manager: 'Who is the employee\'s manager?',
    },
    updateEmployee: 'Update an employee role',
    updateEmployeeOptions: {
        which: 'Which employee would you like to update?'
    },
    return: 'Return to the main menu (Choosing "No" will exit the application)',
    validate: 'Please provide a valid answer.',
    validateStringLength: 'Response must be 1 to 30 characters in length.'
}

function validateInputText(input) {
    if (isNaN(input) && input.length > 0 && input.length <= 30) {
        return true;
    } else if (!isNaN(input)) {
        console.log('\n', prompts.validate);
        return false;
    }
    console.log('\n', prompts.validateStringLength);
    return false;
};

// Displays the base menu
function menu() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menuOption',
            message: prompts.options,
            choices: [prompts.departments, prompts.roles, prompts.employees, prompts.addDepartment, prompts.addRole, prompts.addEmployee, prompts.updateEmployee]
        }
    ])
};

// Function for running follow-up prompts based on the menu choice
function optionHandler(choice) {
    if (choice.menuOption === prompts.departments) {
        displayDepartments().then(returnToMenu);
    }
    if (choice.menuOption === prompts.roles) {
        displayRoles();
    }
    if (choice.menuOption === prompts.employees) {
        displayEmployees().then(returnToMenu);
    }
    if (choice.menuOption === prompts.addDepartment) {
        addDepartment();
    }
    if (choice.menuOption === prompts.addRole) {
        addRole();
    }
    if (choice.menuOption === prompts.addEmployee) {
        addEmployee();
    }
    if (choice.menuOption === prompts.updateEmployee) {
        chooseEmployee();
    }
}

// Function to prompt the user whether to return to the menu
function returnToMenu() {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'return',
            message: prompts.return,
            default: true
        }
    ])
        .then(returnToMenuHandler);
};

// Function to handle user choice to return to the menu or exit the application
function returnToMenuHandler(data) {
    if (!data.return) {
        process.exit();
    }
    return init();
};

async function displayRoles() {
    const sql = `SELECT title AS Role, salary AS Salary, department.name AS Department
                FROM role
                JOIN department ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
        return returnToMenu();
    })
};

function addDepartment() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: prompts.addDepartmentOptions.name,
            validate: nameInput => {
                return validateInputText(nameInput);
            }
        }
    ])
        .then(postDepartment)
        .then(result => console.log(result))
        .then(returnToMenu);
};

function addRole() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: prompts.addRoleOptions.title,
            validate: titleInput => {
                return validateInputText(titleInput);
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: prompts.addRoleOptions.salary,
            validate: salaryInput => {
                if (!isNaN(salaryInput)) {
                    return true;
                }
                console.log('\n', prompts.validate);
                return false;
            }
        },
        {
            type: 'list',
            name: 'department',
            message: prompts.addRoleOptions.department,
            choices: []
        }
    ])
        .then(role => {
            console.log('Do something with this role data.', role);
            return returnToMenu();
        })
};

function getEmployeeData() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: prompts.addEmployeeOptions.firstName,
            validate: nameInput => {
                return validateInputText(nameInput);
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: prompts.addEmployeeOptions.lastName,
            validate: nameInput => {
                return validateInputText(nameInput);
            }
        },
        {
            type: 'list',
            name: 'role',
            message: prompts.addEmployeeOptions.role,
            choices: []
        },
        {
            type: 'list',
            name: 'manager',
            message: prompts.addEmployeeOptions.manager,
            choices: []
        }
    ])
}

function addEmployee() {
    getEmployeeData()
        .then(employee => {
            console.log('Do something with this department data.', employee);
            return returnToMenu();
        })
};

function chooseEmployee() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeChoice',
            choices: []
        }
    ])
        .then(updateEmployee);
}

function updateEmployee(data) {
    getEmployeeData()
        .then(employee => {
            console.log('Do something with this department data.', employee);
            return returnToMenu();
        })
};

// Function to initialize the application at the base menu
function init() {
    menu()
        .then(optionHandler);
};

module.exports = {
    init
};