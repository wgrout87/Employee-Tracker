class Role {
    constructor(title = '', salary = null, department = '') {
        this.title = title;
        this.salary = salary;
        this.department = department;

        this.getValues = function () {
            return [this.title, this.salary, this.department];
        }
    };
}

module.exports = Role;