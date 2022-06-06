const inquirer = require('inquirer');
const db = require('./db/connection')
const Department = require('./utils/constructors/Department');
const Employee = require('./utils/constructors/Employee');
const Role = require('./utils/constructors/Role');
const { displayDepartments, postDepartment, arrayOfDepartments, getDepartmentId, deleteDep } = require('./utils/department/departmentScripts');
const { displayRoles, postRole, arrayOfRoles, getRoleId, updateRoleDepartmentDb, updateRoleSalaryDb, deleteRole } = require('./utils/role/roleScripts');
const { displayEmployees, arrayOfManagers, getEmployeeId, postEmployee, arrayOfEmployees, updateEmployee, displayEmployeesbyManager, displayEmployeesbyDepartment, deleteEmp } = require('./utils/employee/employeeScripts');
const { response } = require('express');
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
        salary: 'What is the salary for the role? (Must be a number)',
        department: 'What is the department for the role?'
    },
    addEmployee: 'Add an employee',
    addEmployeeOptions: {
        firstName: 'What is the employee\'s first name? (1-30 Characters)',
        lastName: 'What is the employee\'s last name? (1-30 Characters)',
        role: 'What is the employee\'s role?',
        manager: 'Who is the employee\'s manager?',
    },
    updateRole: 'Update a role',
    updateRoleOptions: {
        which: 'Which role would you like to update?',
        propertyChoice: 'Would you like to update the department or the salary?'
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

// Checks text input for length and that it's text and NaN
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
            choices: [prompts.departments, prompts.roles, prompts.employees, prompts.addDepartment, prompts.addRole, prompts.addEmployee, prompts.updateRole, prompts.updateEmployee, prompts.updateEmployeeManagers, prompts.viewByManager, prompts.viewByDepartment, prompts.deleteDepartment, prompts.deleteRole, prompts.deleteEmployee]
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
        case prompts.updateRole:
            updateRole();
            break;
        case prompts.updateEmployee:
            updateEmployeeRole();
            break;
        case prompts.updateEmployeeManagers:
            updateEmployeeManager();
            break;
        case prompts.viewByManager:
            displayByManager();
            break;
        case prompts.viewByDepartment:
            displayByDepartment();
            break;
        case prompts.deleteDepartment:
            deleteDepartment();
            break;
        case prompts.deleteRole:
            deleteARole();
            break;
        case prompts.deleteEmployee:
            deleteEmployee();
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

// Function for adding a new department
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
            // Creates a new department object using the name that was input
            const newDepartment = new Department(data.name);
            // Adds the new department to the database
            return postDepartment(newDepartment);
        })
        .then(result => console.log(result))
        .then(returnToMenu);
};

// Function for adding a new role
function addRole() {
    // Returns an array containing all of the departments in the database
    arrayOfDepartments().then(departmentsArray => {
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
                // Uses the array of all departments in the database for the answer choices
                choices: departmentsArray
            }
        ])
            .then(data => {
                // Converts the department name to it primary key value
                return getDepartmentId(data.department)
                    .then(id => {
                        // Creates a new role object using the prompt inputs
                        const newRole = new Role(data.title, data.salary, id);
                        // Adds the new role to the database
                        return postRole(newRole);
                    })
            })
            .then(result => console.log(result))
            .then(returnToMenu);
    })
};

// Function for adding an employee
function addEmployee() {
    // Returns an array containing all of the roles in the database
    arrayOfRoles().then(rolesArray => {
        // Returns an array containing all of the managers in the database
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
                    // Uses the array of all roles in the database for the answer choices
                    choices: rolesArray
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: prompts.addEmployeeOptions.manager,
                    // Uses the array of all managers in the database for the answer choices
                    choices: managersArray
                }
            ])
        })
    })
        .then(employee => {
            // Gets the manager's primary key value
            return getEmployeeId(employee.manager).then(managerId => {
                // Gets the role's primary key value
                return getRoleId(employee.role).then(roleId => {
                    // Creates a new employee object using the prompt inputs
                    const newEmployee = new Employee(employee.firstName, employee.lastName, roleId, managerId);
                    return postEmployee(newEmployee);
                })
            })
        })
        .then(result => console.log(result))
        .then(returnToMenu);
};

function updateRole() {
    // Returns an array containing all of the roles in the database
    arrayOfRoles()
        .then(rolesArray => {
            // Returns an array containing all of the departments in the database
            return arrayOfDepartments().then(departmentsArray => {
                return inquirer.prompt([
                    // Which role to update
                    {
                        type: 'list',
                        name: 'role',
                        message: prompts.updateRoleOptions.which,
                        // Uses the array of all roles in the database for the answer choices
                        choices: rolesArray
                    },
                    // Which property of the role to update
                    {
                        type: 'list',
                        name: 'choice',
                        message: prompts.updateRoleOptions.propertyChoice,
                        choices: ['Department', 'Salary']
                    }
                ])
                    .then(answer => {
                        // Functions to run based on the user's answer
                        switch (answer.choice) {
                            case 'Department':
                                updateRoleDepartment(answer.role, departmentsArray);
                                break;
                            case 'Salary':
                                updateRoleSalary(answer.role);
                                break;
                        }
                    })
            })
        })
};

// Function for updating a role's department
function updateRoleDepartment(roleName, departmentsArray) {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'department',
            message: prompts.updateRoleOptions.which,
            // Uses the array of all departments in the database for the answer choices
            choices: departmentsArray
        }
    ])
        .then(data => {
            return getDepartmentId(data.department)
                .then(departmentId => {
                    // Gets the role's primary key value
                    getRoleId(roleName).then(roleId => {
                        // Function for updating the role's department in the database using the department and role ID's
                        return updateRoleDepartmentDb(departmentId, roleId);
                    })
                        .then(response => {
                            console.log(response);
                            return returnToMenu();
                        })
                });
        })
};

// Function for updating a role's salary
function updateRoleSalary(roleName) {
    return inquirer.prompt([
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
        }
    ])
        .then(data => {
            // Gets the role's primary key value
            getRoleId(roleName).then(roleId => {
                // Function for updating the role's salary in the database using the input salary and the role ID
                return updateRoleSalaryDb(data.salary, roleId);
            })
                .then(response => {
                    console.log(response);
                    return returnToMenu();
                })
        })
}

// Function for updating an employee's role
function updateEmployeeRole() {
    // Returns an array containing all of the roles in the database
    arrayOfEmployees().then(employeeArray => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: prompts.updateEmployeeOptions.which,
                // Uses the array of all employees in the database for the answer choices
                choices: employeeArray
            }
        ])
    })
        .then(employee => {
            // Gets the employee's primary key value
            return getEmployeeId(employee.name)
        })
        .then(id => {
            // Returns an array containing all of the roles in the database
            return arrayOfRoles().then(rolesArray => {
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: prompts.addEmployeeOptions.role,
                        // Uses the array of all roles in the database for the answer choices
                        choices: rolesArray
                    }
                ])
                    .then(data => {
                        // Gets the role's primary key value
                        return getRoleId(data.role)
                    })
                    .then(roleId => {
                        // Function for updating the employee in the database, passing "role" as the first parameter to indicate the role is being updated, and then using the role and employee ID's
                        return updateEmployee('role', roleId, id)
                    })
                    .then(result => console.log(result))
                    .then(returnToMenu)
            })
        });
};

// Function for updating an employee's manager
function updateEmployeeManager() {
    // Returns an array containing all of the roles in the database
    arrayOfEmployees().then(employeeArray => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: prompts.updateEmployeeOptions.which,
                // Uses the array of all employees in the database for the answer choices
                choices: employeeArray
            }
        ])
    })
        .then(employee => {
            // Gets the employee's primary key value
            return getEmployeeId(employee.name)
        })
        .then(id => {
            // Returns an array containing all of the managers in the database
            return arrayOfManagers().then(managersArray => {
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'manager',
                        message: prompts.addEmployeeOptions.manager,
                        // Uses the array of all managers in the database for the answer choices
                        choices: managersArray
                    }
                ])
                    .then(data => {
                        // Gets the manager's primary key value
                        return getEmployeeId(data.manager)
                    })
                    .then(managerId => {
                        // Function for updating the employee in the database, passing "manager" as the first parameter to indicate the manager is being updated, and then using the manager's and employee's employee ID's
                        return updateEmployee('manager', managerId, id)
                    })
                    .then(result => console.log(result))
                    .then(returnToMenu)
            })
        });
};

// Function for displaying all employees under a specified manager
function displayByManager() {
    // Returns an array containing all of the managers in the database
    arrayOfManagers().then(managersArray => {
        // Removes the "none" option from the managers array
        managersArray.pop();
        // Prompts the user to chose a manager
        return inquirer.prompt([
            {
                type: 'list',
                name: 'manager',
                message: prompts.addEmployeeOptions.manager,
                // Uses the array of all managers in the database for the answer choices
                choices: managersArray
            }
        ])
            .then(data => {
                // Displays employees who are under the user's chosen manager
                return displayEmployeesbyManager(data.manager);
            })
            .then(rows => console.table(rows))
            .then(returnToMenu)
    });
};

// Function for displaying all employees working in a specified department
function displayByDepartment() {
    // Returns an array containing all of the departments in the database
    arrayOfDepartments().then(departmentsArray => {
        // Prompts the user to chose a department
        return inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: prompts.viewByDepartmentOptions.which,
                // Uses the array of all departments in the database for the answer choices
                choices: departmentsArray
            }
        ])
            .then(data => {
                // Displays employees who work in the user's chosen department
                return displayEmployeesbyDepartment(data.department);
            })
            .then(rows => console.table(rows))
            .then(returnToMenu)
    });
};

// Function for deleting a department
function deleteDepartment() {
    // Returns an array containing all of the departments in the database
    arrayOfDepartments().then(departmentsArray => {
        // Prompts the user to chose a department
        return inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: prompts.deleteDepartmentOptions.which,
                // Uses the array of all departments in the database for the answer choices
                choices: departmentsArray
            }
        ])
            .then(data => {
                // Function for removing the user's chosen department from the database
                return deleteDep(data.department);
            })
            .then(message => console.log(message))
            .then(returnToMenu)
    });
};

// Function for deleting a role
function deleteARole() {
    // Returns an array containing all of the roles in the database
    arrayOfRoles().then(rolesArray => {
        // Prompts the user to chose a role
        return inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: prompts.deleteRoleOptions.which,
                // Uses the array of all roles in the database for the answer choices
                choices: rolesArray
            }
        ])
            .then(data => {
                // Function for removing the user's chosen role from the database
                return deleteRole(data.role);
            })
            .then(message => console.log(message))
            .then(returnToMenu)
    });
};

// Function for deleting an employee
function deleteEmployee() {
    arrayOfEmployees().then(employeesArray => {
        // Prompts the user to chose an employee
        return inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: prompts.deleteEmployeeOptions.which,
                choices: employeesArray
            }
        ])
            .then(data => {
                // Function for removing the user's chosen employee from the database
                return deleteEmp(data.employee);
            })
            .then(message => console.log(message))
            .then(returnToMenu)
    });
};

// Function to initialize the application at the base menu
function init() {
    menu()
        .then(optionHandler);
};

module.exports = {
    init
};