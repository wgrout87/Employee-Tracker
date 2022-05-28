const inquirer = require('inquirer');
const db = require('./db/connection');

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
}

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

function optionHandler(choice) {
    if (choice.menuOption === prompts.departments) {
        console.log('departments');
    }
    if (choice.menuOption === prompts.roles) {
        console.log('roles');
    }
    if (choice.menuOption === prompts.employees) {
        console.log('employees');
    }
    if (choice.menuOption === prompts.addDepartment) {
        console.log('addDepartment');
    }
    if (choice.menuOption === prompts.addRole) {
        console.log('addRole');
    }
    if (choice.menuOption === prompts.addEmployee) {
        console.log('addEmployee');
    }
    if (choice.menuOption === prompts.updateEmployee) {
        console.log('updateEmployee');
    }
}

function displayDepartments() {

}

function init() {
    menu()
        .then(optionHandler);
};

module.exports = {
    init
};