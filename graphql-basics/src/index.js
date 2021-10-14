import myLanguage, {message, getGreeting, name} from './myModule';
import total, {subtract, divide, multiply} from './math';

console.log(myLanguage);
console.log(message);
console.log(name);
console.log(getGreeting('Ekip'));

console.log(total(1, 2));
console.log(subtract(1, 2));
console.log(divide(1, 2));
console.log(multiply(1, 2));

