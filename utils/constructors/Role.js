// Role class constructor
class Role {
    constructor(title = '', salary = null, department = '') {
        this.title = title;
        this.salary = salary;
        this.department = department;

        // Function for returning an array holding all the property values for this object
        this.getValues = function () {
            return [this.title, this.salary, this.department];
        }
    };
}

module.exports = Role;