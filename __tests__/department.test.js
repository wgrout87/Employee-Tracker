const Department = require('../utils/constructors/Department');

test('Create an department object', () => {
    const department = new Department('Fake Department');

    expect(department.name).toBe('Fake Department');
})