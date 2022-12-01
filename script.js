'use strict';

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let rollback = 10;

let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = fullPrice - (fullPrice * (rollback / 100));

let allServicePrices;


const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
};


// Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой"
const getTitle = function (titleProject) {
    let newTitle = titleProject.trim();

    return newTitle[0].toUpperCase() + newTitle.substring(1).toLowerCase();
};


// Функция возвращает сумму всех дополнительных услуг
const getAllServicePrices = function() {
    return allServicePrices = servicePrice1 + servicePrice2;
 };

// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
// function declaration
function getFullPrice() {
    return fullPrice = screenPrice + allServicePrices;
}

// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
const getServicePercentPrices = function() {
    return servicePercentPrice = fullPrice - (fullPrice * (rollback / 100));
};



const getRollbackMessage = function(price) {
    if(price >= 30000) {
        return 'Даем скидку в 10%';
    } else if(price >= 15000 && price < 30000) {
        return 'Даем скидку в 5%';
    } else if (price < 15000 && price >= 0) {
        return "Скидка не предусмотрена";
    } else {
        return 'Что то пошло не так';
    }
};



showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log( getTitle(title) );

console.log( getAllServicePrices() );
console.log( getFullPrice() );

console.log( getServicePercentPrices() );
console.log( getRollbackMessage(fullPrice) );







