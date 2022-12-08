'use strict';


const appData = {
    title: '',
    screens: [],
    screenPrice: 0, 
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},

    start: function() {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();

        appData.logger();
    },

    isNumber: function(num) {
        return !isNaN( parseFloat(num) ) && isFinite(num);
    },

    isString: function(str) {
        // return typeof str === 'string' && typeof +str === 'number';
        return isNaN(str);
    },

    asking: function() {
    
        do {
            appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
        } while(!appData.isString(appData.title));


        for(let i = 0; i < 2; i++) {
            let name;
            let price = 0;

            do {
                name = prompt('Какие типы экранов нужно разработать?');
            } while(!appData.isString(name));

            do {
                price = prompt('Сколько будет стоить данная работа?');
            } while(!appData.isNumber(price));

            appData.screens.push({
                id: i,
                name: name,
                price: price
            });
        }


        for(let i = 0; i < 2; i++) {
            let name;
            let price = 0;

            do {
                name = prompt('Какой дополнительный тип услуги нужен?');
            } while(!appData.isString(name));
            
            do{
                price = prompt('Сколько это будет стоить?');
            } while(!appData.isNumber(price));

            appData.services[name + i] = +price;
        }

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

    addPrices: function() {
        appData.screenPrice = appData.screens.reduce(function(sum, number) {
            return sum += +number.price;          
        }, 0);


        for(let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    
    
    // Метод возвращает сумму стоимости верстки и стоимости дополнительных услуг
    getFullPrice: function () {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },
    
    
    // Метод возвращает сумму стоимости верстки и стоимости дополнительных услуг
    getServicePercentPrices: function() {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },
    
    
    // Метод возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой"
    getTitle: function () {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
    },
    
    
    getRollbackMessage: function(price) {
        if(price >= 30000) {
            return 'Даем скидку в 10%';
        } else if(price >= 15000 && price < 30000) {
            return 'Даем скидку в 5%';
        } else if (price < 15000 && price >= 0) {
            return "Скидка не предусмотрена";
        } else {
            return 'Что то пошло не так';
        }
    },

    logger: function() {
        console.log(appData.fullPrice);
        console.log('appData.screenPrice', appData.screenPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        console.log(appData.services); 
    },

};



// appData.start();





