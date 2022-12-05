'use strict';


const appData = {
    title: '',
    screens: '',
    screenPrice: 0, 
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',

    asking: function() {
        appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Порстые, Сложные');
        
        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?');
        } while(!isNumber(appData.screenPrice));
        
    
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

};


const isNumber = function(num) {
    return !isNaN( parseFloat(num) ) && isFinite(num);
};



// Функция возвращает сумму всех дополнительных услуг
const getAllServicePrices = function() {
    let sum = 0;

    for(let i = 0; i < 2; i++) {
        let price = 0;

        if(i === 0) {
            appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
        } else if (i === 1) {
            appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
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





// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
const getFullPrice = function () {
    return +appData.screenPrice + appData.allServicePrices;
};


// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
const getServicePercentPrices = function() {
    return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
};


// Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой"
const getTitle = function () {
    return appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
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


appData.asking();
appData.allServicePrices = getAllServicePrices();
appData.fullPrice = getFullPrice();
appData.servicePercentPrice = getServicePercentPrices();
appData.title = getTitle();



console.log(appData.fullPrice);
console.log(appData.servicePercentPrice);

// console.log('////////////////////////////////////////');
// console.log(title);
// console.log('allServicePrices', allServicePrices); 
// console.log('fullPrice', fullPrice); 
// console.log('servicePercentPrice', servicePercentPrice); 


// console.log(getRollbackMessage(fullPrice));
// console.log(typeof title);
// console.log(typeof screenPrice);
// console.log(typeof adaptive);

// console.log(screens.length);
// console.log(servicePercentPrice);


// console.log("Стоимость верстки экранов " + screenPrice + " тенге и Стоимость разработки сайта " + fullPrice + " тенге");






