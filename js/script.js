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
    isBlocked: true,
    
    init: function () {
        this.addTitle();
        this.changeRange();
        startBtn.addEventListener('click', this.start.bind(this));
        buttonPlus.addEventListener('click', this.addScreenBlock);

        // console.log(this);
        // console.log(this.start());
        // console.log(this.start.bind(this));
    },
    
    addTitle: function () {
        document.title = title.textContent;
    },

    start: function() {
        // console.log(this);

        this.screenCheck();

        if (!this.isBlocked) {
            this.addScreens();
            this.addServices();
            this.addPrices();
            this.showResult();
          } else {
            alert('Выберите тип экрана и заполните все поля');
          }
       
    },
    
    showResult: function() {
        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
        totalCount.value = this.countScreens;
    },

    screenCheck: function() {
        screens = document.querySelectorAll('.screen');

        screens.forEach(screen => {
            const select = screen.querySelector('select'); 
            const input = screen.querySelector('input');

            this.isBlocked = (select.value && input.value) ? false : true;
        });

    },

    addScreens: function() {
        screens = document.querySelectorAll('.screen');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select'); 
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            });
            
        });
    },

    addServices: function() {
        otherItemsPercent.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
              
        });

        otherItemsNumber.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
              
        });
    },

    addScreenBlock: function() {
        const cloneScreen = screens[0].cloneNode(true);

        screens[screens.length - 1].after(cloneScreen);
    },

    changeRange: function () {
        inputRange.addEventListener('input', function() {
            this.rollback = inputRange.value;
            inputRangeValue.textContent = inputRange.value + '%';
        });
    },

    addPrices: function() {

        this.screens.forEach(item => {
            this.screenPrice += item.price;
            this.countScreens += item.count;
        });

        for(let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        for(let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }

        this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
    },
    

    logger: () => {
        console.log(appData.fullPrice);
        console.log('appData.screenPrice', appData.screenPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        console.log(appData.services); 
    },

};



appData.init();





