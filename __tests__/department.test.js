const Department = require('../utils/Department');

test('Create an department object', () => {
    const department = new Department('Fake Department');

    expect(department.name).toBe('Fake Department');
})