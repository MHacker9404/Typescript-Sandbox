function PropertyLog(target: any, propertyName: string | Symbol) {
    console.log('Property decorator');
    console.log(target, propertyName);
}

function ParamLog(target: any, name: string | Symbol, position: number) {
    console.log('Param decorator');
    console.log(target, name, position);
}

class Product {
    constructor(@ParamLog public title: string, public price: number) {}
    public getPriceWithTax(tax: number) {
        return this.price + this.price * tax;
    }
}
