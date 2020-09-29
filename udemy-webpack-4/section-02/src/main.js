import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './main.css';
import './images/link.jpg';
import './index.html';

var a = async (args) => {
    const { a, b } = args;
    await console.log('Hello from the future!', a, b);
    await console.log('Hello from the future!', a, b);
};

a({ a: 1, b: 2 });
