const Role = require('../utils/Role');

test('Create a role object', () => {
    const role = new Role('Big Boss', 1000000, 5);

    expect(role.name).toBe('Big Boss');
    expect(role.salary).toBe(1000000);
    expect(role.department).toBe(5);
})