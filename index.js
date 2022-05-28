const inquirer = require('inquirer');
// const db = require('./db/connection');
const Employee = require('./utils/Employee');
const Role = require('./utils/Role');

// Object containing all of the prompt text
const prompts = {
    options: 'What would you like to do?',
    departments: 'View all departments',
    roles: 'View all roles',
    employees: 'View all employees',
    addDepartment: 'Add a department',
    addDepartmentOptions: {
        name: 'What is the name of the new department?'
    },
    addRole: 'Add a role',
    addRoleOptions: {
        name: 'What is the name of the new role?',
        salary: 'What is the salary for the new role?',
        department: 'What is the department for the new role?'
    },
    addEmployee: 'Add an employee',
    addEmployeeOptions: {
        firstName: 'What is the employee\'s first name?',
        lastName: 'What is the employee\'s last name?',
        role: 'What is the employee\'s role?',
        manager: 'Who is the employee\'s manager?',
    },
    updateEmployee: 'Update an employee role',
    updateEmployeeOptions: {
        which: 'Which employee would you like to update?'
    },
    return: 'Return to the main menu (Choosing "No" will exit the application)'
}

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
        displayDepartments();
    }
    if (choice.menuOption === prompts.roles) {
        displayRoles();
    }
    if (choice.menuOption === prompts.employees) {
        displayEmployees();
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

function displayDepartments() {
    console.log('Fetch request needed');
    return returnToMenu();
};

function displayRoles() {
    console.log('Fetch request needed');
    return returnToMenu();
};

function displayEmployees() {
    console.log('Fetch request needed');
    return returnToMenu();
};

function addDepartment() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: prompts.addDepartmentOptions.name
        }
    ])
        .then(department => {
            console.log('Do something with this department data.', department);
            return returnToMenu();
        })
};

function addRole() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: prompts.addRoleOptions.name
        },
        {
            type: 'input',
            name: 'salary',
            message: prompts.addRoleOptions.salary
        },
        {
            type: 'input',
            name: 'department',
            message: prompts.addRoleOptions.department
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
            message: prompts.addEmployeeOptions.firstName
        },
        {
            type: 'input',
            name: 'lastName',
            message: prompts.addEmployeeOptions.firstName
        },
        {
            type: 'input',
            name: 'role',
            message: prompts.addEmployeeOptions.role
        },
        {
            type: 'input',
            name: 'manager',
            message: prompts.addEmployeeOptions.manager
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