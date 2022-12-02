'use strict';

let title;
let screens;
let screenPrice; 
let adaptive;
let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;



const isNumber = function(num) {
    return !isNaN( parseFloat(num) ) && isFinite(num);
};


const asking = function() {
    title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    screens = prompt('Какие типы экранов нужно разработать?', 'Порстые, Сложные');
    
    do {
        screenPrice = prompt('Сколько будет стоить данная работа?');
    } while(!isNumber(screenPrice));
    

    adaptive = confirm('Нужен ли адаптив на сайте?');
};


// Функция возвращает сумму всех дополнительных услуг
const getAllServicePrices = function() {
    let sum = 0;

    for(let i = 0; i < 2; i++) {
        let price = 0;

        if(i === 0) {
            let service1 = prompt('Какой дополнительный тип услуги нужен?');
        } else if (i === 1) {
            let service2 = prompt('Какой дополнительный тип услуги нужен?');
        }

        do{
            price = prompt('Сколько это будет стоить?');
        } while(!isNumber(price));

        
        sum += +price;

        // sum += +prompt('Сколько это будет стоить?');
        // sum = sum + +prompt('Сколько это будет стоить?');
    }
    
    return sum;
 };


const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
};


// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
const getFullPrice = function () {
    return +screenPrice + allServicePrices;
};


// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
const getServicePercentPrices = function() {
    return fullPrice - (fullPrice * (rollback / 100));
};


// Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой"
const getTitle = function () {
    return title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase();
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


asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();


showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log('////////////////////////////////////////');

console.log('allServicePrices', allServicePrices); 
console.log('fullPrice', fullPrice); 
console.log('servicePercentPrice', servicePercentPrice); 


console.log(getRollbackMessage(fullPrice));
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(servicePercentPrice);


console.log("Стоимость верстки экранов " + screenPrice + " тенге и Стоимость разработки сайта " + fullPrice + " тенге");






