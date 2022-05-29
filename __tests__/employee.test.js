const Employee = require('../utils/Employee');

test('Create an employee object', () => {
    const employee = new Employee('Chet', 'McMasterson', 3, 4);

    expect(employee.first_name).toBe('Chet');
    expect(employee.last_name).toBe('McMasterson');
    expect(employee.role_id).toBe(3);
    expect(employee.manager_id).toBe(4);
})

test('Retrieve employee object properties', () => {
    const employee = new Employee('Chet', 'McMasterson', 3, 4);

    expect(employee.getValues()).toEqual(['Chet', 'McMasterson', 3, 4]);
})

test('Check that null entry for manager_id will return null', () => {
    const employee = new Employee('Chet', 'McMasterson', 3, null);

    expect(employee.first_name).toBe('Chet');
    expect(employee.last_name).toBe('McMasterson');
    expect(employee.role_id).toBe(3);
    expect(employee.manager_id).toBe(null);
})