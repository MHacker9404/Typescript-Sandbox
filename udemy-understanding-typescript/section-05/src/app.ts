class Department {
    private employees: string[] = [];
    constructor(private readonly id: string, public name: string) {}
    public describe() {
        console.log(`Department (${this.id}): ${this.name}`);
        this.printEmployeeInformation();
    }
    public addEmployee(employee: string) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }

    public static createEmployee(name: string) {
        return { name: name };
    }
}

class ItDepartment extends Department {
    constructor(id: string, name: string, public admins: string[]) {
        super(id, name);
    }
}

let department = new Department('id', 'departmentName');
console.info(department);

department.addEmployee('phil');
department.describe();

const employee = Department.createEmployee('phil');

let itDepartment = new ItDepartment('it', 'IT', ['Max']);
itDepartment.describe();
