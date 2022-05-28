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
    return: 'Return to the main menu (Choosing no will exit the application)'
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
        return returnToMenu();
    }
    if (choice.menuOption === prompts.roles) {
        console.log('roles');
        return returnToMenu();
    }
    if (choice.menuOption === prompts.employees) {
        console.log('employees');
        return returnToMenu();
    }
    if (choice.menuOption === prompts.addDepartment) {
        console.log('addDepartment');
        return returnToMenu();
    }
    if (choice.menuOption === prompts.addRole) {
        console.log('addRole');
        return returnToMenu();
    }
    if (choice.menuOption === prompts.addEmployee) {
        console.log('addEmployee');
        return returnToMenu();
    }
    if (choice.menuOption === prompts.updateEmployee) {
        console.log('updateEmployee');
        return returnToMenu();
    }
}

function returnToMenu () {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'return',
            message: prompts.return,
            default: true
        }
    ])
};

function returnToMenuHandler(data) {
    if (!data.return) {
        process.exit();
    }
    return init();
};

function displayDepartments() {

}

function init() {
    menu()
        .then(optionHandler)
        .then(returnToMenuHandler);
};

module.exports = {
    init
};