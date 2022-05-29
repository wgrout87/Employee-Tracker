const inquirer = require('inquirer');
const db = require('./db/connection')
const Department = require('./utils/Department');
const Employee = require('./utils/Employee');
const Role = require('./utils/Role');
const { displayDepartments, postDepartment, arrayOfDepartments, departmentId } = require('./routes/apiRoutes/departmentRoutes');
const { displayRoles, postRole, arrayOfRoles } = require('./routes/apiRoutes/roleRoutes');
const { displayEmployees } = require('./routes/apiRoutes/employeeRoutes');
require('console.table');

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
        displayRoles().then(returnToMenu);
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
        .then(data => {
            const newDepartment = new Department(data.name);
            return postDepartment(newDepartment);
        })
        .then(result => console.log(result))
        .then(returnToMenu);
};

function addRole() {
    return arrayOfDepartments().then(departmentsArray => {
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
                choices: departmentsArray
            }
        ])
            .then(data => {
                return departmentId(data.department)
                    .then(id => {
                        const newRole = new Role(data.title, data.salary, id);
                        return postRole(newRole);
                    })
            })
            .then(result => console.log(result))
            .then(returnToMenu);
    })
};

function getEmployeeData() {
    return arrayOfRoles().then(array => {
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
                choices: array
            },
            {
                type: 'list',
                name: 'manager',
                message: prompts.addEmployeeOptions.manager,
                choices: []
            }
        ])
    });
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