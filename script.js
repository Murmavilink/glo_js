'use strict';

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');


let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;


let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');


// Функция возвращает сумму всех дополнительных услуг
const getAllServicePrices = function() {
    return servicePrice1 + servicePrice2;
 };


const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
};


// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
const getFullPrice = function () {
    return screenPrice + allServicePrices;
};


// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
const getServicePercentPrices = function() {
    return fullPrice - (fullPrice * (rollback / 100));
};


// Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой"
const getTitle = function () {
    return title[0].toUpperCase() + title.trim().substring(1).toLowerCase();
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



allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();


showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(getRollbackMessage(fullPrice))
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(servicePercentPrice);


console.log("Стоимость верстки экранов " + screenPrice + " тенге и Стоимость разработки сайта " + fullPrice + " тенге");






