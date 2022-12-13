'use strict';

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0, 
    adaptive: true,
    rollback: 10,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    countScreens: 0,
    
    init: function () {
        appData.addTitle();
        appData.changeRange();
        startBtn.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock);
    },
    
    addTitle: function () {
        document.title = title.textContent;
    },

    start: function() {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        // appData.getServicePercentPrices();

        // appData.logger();
        console.log(appData);
        appData.showResult();
    },
    
    showResult: function() {
        console.log('showResult');
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
        totalCount.value = appData.countScreens;
    },

    addScreens: function() {
        screens = document.querySelectorAll('.screen');

        screens.forEach(function(screen, index) {
            const select = screen.querySelector('select'); 
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            });
            
        });

        // console.log(appData.screens);
    },

    addServices: function() {
        otherItemsPercent.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
              
        });

        otherItemsNumber.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
              
        });
    },

    addScreenBlock: function() {
        const cloneScreen = screens[0].cloneNode(true);

        screens[screens.length - 1].after(cloneScreen);
    },

    changeRange: function () {
        inputRange.addEventListener('input', function() {
            appData.rollback = inputRange.value;
            inputRangeValue.textContent = inputRange.value + '%';
        });
    },

    addPrices: function() {
        // appData.screenPrice = appData.screens.reduce(function(sum, item) {
        //     return sum += +item.price;          
        // }, 0);


        // appData.screenPrice = appData.screens.reduce(function(sum, item) {
        //     return sum += +item.price;          
        // }, 0);

        appData.screens.forEach(function(item) {
            appData.screenPrice += item.price;
            appData.countScreens += item.count;
        });

        for(let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        for(let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
            // console.log(appData.screenPrice);
            // console.log(appData.servicesPercent[key]);
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },
    

    // logger: function() {
    //     console.log(appData.fullPrice);
    //     console.log('appData.screenPrice', appData.screenPrice);
    //     console.log(appData.servicePercentPrice);
    //     console.log(appData.screens);
    //     console.log(appData.services); 
    // },

};



appData.init();





