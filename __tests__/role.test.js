const Role = require('../utils/constructors/Role');

test('Create a role object', () => {
    const role = new Role('Big Boss', 1000000, 5);

    expect(role.title).toBe('Big Boss');
    expect(role.salary).toBe(1000000);
    expect(role.department).toBe(5);
})

test('Retrieve role object properties', () => {
    const role = new Role('Big Boss', 1000000, 5);

    expect(role.getValues()).toEqual(['Big Boss', 1000000, 5]);
})