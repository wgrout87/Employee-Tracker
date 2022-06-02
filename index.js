const inquirer = require('inquirer');
const db = require('./db/connection')
const Department = require('./utils/Department');
const Employee = require('./utils/Employee');
const Role = require('./utils/Role');
const { displayDepartments, postDepartment, arrayOfDepartments, getDepartmentId } = require('./routes/apiRoutes/departmentRoutes');
const { displayRoles, postRole, arrayOfRoles, getRoleId } = require('./routes/apiRoutes/roleRoutes');
const { displayEmployees, arrayOfManagers, getEmployeeId, postEmployee, arrayOfEmployees, updateEmployee, displayEmployeesbyManager, displayEmployeesbyDepartment } = require('./routes/apiRoutes/employeeRoutes');
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
    updateEmployeeManagers: 'Update employee managers',
    viewByManager: 'View employees by manager',
    viewByDepartment: 'View employees by department',
    viewByDepartmentOptions: {
        which: 'Which department?'
    },
    deleteDepartment: 'Delete a department',
    deleteDepartmentOptions: {
        which: 'Which department would you like to delete?'
    },
    deleteRole: 'Delete a role',
    deleteRoleOptions: {
        which: 'Which role would you like to delete?'
    },
    deleteEmployee: 'Delete an employee',
    deleteEmployeeOptions: {
        which: 'Which employee would you like to delete?'
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
            choices: [prompts.departments, prompts.roles, prompts.employees, prompts.addDepartment, prompts.addRole, prompts.addEmployee, prompts.updateEmployee, prompts.updateEmployeeManagers, prompts.viewByManager, prompts.viewByDepartment, prompts.deleteDepartment, prompts.deleteRole, prompts.deleteEmployee]
        }
    ])
};

// Function for running follow-up prompts based on the menu choice
function optionHandler(choice) {
    switch (choice.menuOption) {
        case prompts.departments:
            displayDepartments().then(returnToMenu);
            break;
        case prompts.roles:
            displayRoles().then(returnToMenu);
            break;
        case prompts.employees:
            displayEmployees().then(returnToMenu);
            break;
        case prompts.addDepartment:
            addDepartment();
            break;
        case prompts.addRole:
            addRole();
            break;
        case prompts.addEmployee:
            addEmployee();
            break;
        case prompts.updateEmployee:
            updateEmployeeRole();
            break;
        case prompts.updateEmployeeManagers:
            updateEmployeeManager();
            break;
        case prompts.viewByManager:
            chooseManager();
            break;
        case prompts.viewByDepartment:
            chooseDepartment();
            break;
        case prompts.deleteDepartment:
            console.log('Delete a department');
            returnToMenu();
            break;
        case prompts.deleteRole:
            console.log('Delete a role');
            returnToMenu();
            break;
        case prompts.deleteEmployee:
            console.log('Delete an employee');
            returnToMenu();
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
                return getDepartmentId(data.department)
                    .then(id => {
                        const newRole = new Role(data.title, data.salary, id);
                        return postRole(newRole);
                    })
            })
            .then(result => console.log(result))
            .then(returnToMenu);
    })
};

function addEmployee() {
    return arrayOfRoles().then(rolesArray => {
        return arrayOfManagers().then(managersArray => {
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
                    choices: rolesArray
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: prompts.addEmployeeOptions.manager,
                    choices: managersArray
                }
            ])
        })
    })
        .then(employee => {
            return getEmployeeId(employee.manager).then(managerId => {
                return getRoleId(employee.role).then(roleId => {
                    const newEmployee = new Employee(employee.firstName, employee.lastName, roleId, managerId);
                    return postEmployee(newEmployee);
                })
            })
        })
        .then(result => console.log(result))
        .then(returnToMenu);
};

function updateEmployeeRole() {
    arrayOfEmployees().then(employeeArray => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: prompts.updateEmployeeOptions.which,
                choices: employeeArray
            }
        ])
    })
        .then(employee => {
            return getEmployeeId(employee.name)
        })
        .then(id => {
            return arrayOfRoles().then(rolesArray => {
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: prompts.addEmployeeOptions.role,
                        choices: rolesArray
                    }
                ])
                    .then(data => {
                        return getRoleId(data.role)
                    })
                    .then(roleId => {
                        return updateEmployee('role', roleId, id)
                    })
                    .then(result => console.log(result))
                    .then(returnToMenu)
            })
        });
};

function updateEmployeeManager() {
    arrayOfEmployees().then(employeeArray => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: prompts.updateEmployeeOptions.which,
                choices: employeeArray
            }
        ])
    })
        .then(employee => {
            return getEmployeeId(employee.name)
        })
        .then(id => {
            return arrayOfManagers().then(managersArray => {
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'manager',
                        message: prompts.addEmployeeOptions.manager,
                        choices: managersArray
                    }
                ])
                    .then(data => {
                        return getEmployeeId(data.manager)
                    })
                    .then(managerId => {
                        return updateEmployee('manager', managerId, id)
                    })
                    .then(result => console.log(result))
                    .then(returnToMenu)
            })
        });
};

function chooseManager() {
    return arrayOfManagers().then(managersArray => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'manager',
                message: prompts.addEmployeeOptions.manager,
                choices: managersArray
            }
        ])
            .then(data => {
                return displayEmployeesbyManager(data.manager);
            })
            .then(rows => console.table(rows))
            .then(returnToMenu)
    });
};

function chooseDepartment() {
    return arrayOfDepartments().then(departmentsArray => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: prompts.viewByDepartmentOptions.which,
                choices: departmentsArray
            }
        ])
            .then(data => {
                return displayEmployeesbyDepartment(data.department);
            })
            .then(rows => console.table(rows))
            .then(returnToMenu)
    })
}

// Function to initialize the application at the base menu
function init() {
    menu()
        .then(optionHandler);
};

module.exports = {
    init
};