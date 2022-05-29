class Employee {
    constructor(first_name = '', last_name = '', role_id = null, manager_id = null) {
        this.full_name = first_name + ' ' + last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;

        this.getValues = function () {
            return [this.full_name, this.role_id, this.manager_id];
        }
    };
}

module.exports = Employee;