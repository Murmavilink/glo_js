'use strict';

// let title = prompt('Как называется ваш проект?');
// let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
// let adaptive = confirm('Нужен ли адаптив на сайте?');

// let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
// let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

let rollback = 10;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil( fullPrice - (fullPrice * (rollback / 100)) );

// console.log(title);
// console.log(adaptive);
// console.log(screens.length);
console.log(screenPrice);
console.log('fullPrice', fullPrice);
console.log('servicePercentPrice', servicePercentPrice);

if(fullPrice >= 30000) {
    console.log('Даем скидку в 10%');
} else if(fullPrice >= 15000 && fullPrice < 30000) {
    console.log('Даем скидку в 5%');
} else if (fullPrice < 15000 && fullPrice >= 0) {
    console.log("Скидка не предусмотрена");
} else {
    alert('Что то пошло не так');
}
