// Employee class constructor
class Employee {
    constructor(first_name = '', last_name = '', role_id = null, manager_id = null) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;

        // Function for returning an array holding all the property values for this object
        this.getValues = function () {
            return [this.first_name, this.last_name, this.role_id, this.manager_id];
        }
    };
}

module.exports = Employee;