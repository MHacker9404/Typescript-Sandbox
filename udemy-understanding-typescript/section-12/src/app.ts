import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import _ from 'lodash';
import { Product } from './product.model';
import { validate } from 'class-validator';

console.log(_.shuffle([1, 2, 3, 4]));

const json = [
    { title: 'A Carpet', price: 29.99 },
    { title: 'A Book', price: 10.99 },
];

const product = new Product('', -12.99);
validate(product).then((errors) => {
    if (errors.length > 0) {
        console.error('Errors');
        console.error(errors);
        return;
    }

    console.log(product.getInformation());
});

const products = plainToClass(Product, json);
products.forEach((product) => console.log(product.getInformation()));
