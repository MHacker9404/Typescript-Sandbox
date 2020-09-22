type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
    //  type guard
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

type Admin2 = {
    name: string;
    privileges: string[];
};

type Employee2 = {
    name: string;
    startDate: Date;
};

type UnknownEmployee = Admin2 | Employee2;
function printEmployeeInfo(e: UnknownEmployee) {
    console.log(`Name: ${e.name}`);
    if ('privileges' in e) {
        console.log(`Privileges: ${e.privileges}`);
    }
}

class Car {
    drive() {}
}
class Truck {
    drive() {}
}
type Vehicle = Car | Truck;
function printVehicle(vehicle: Vehicle) {
    if (vehicle instanceof Car) vehicle.drive();
    if (vehicle instanceof Truck) vehicle.drive();
}
