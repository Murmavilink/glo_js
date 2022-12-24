'use strict';

const title = document.getElementsByTagName('h1')[0];
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const cms = document.querySelector('#cms-open');
const cmsVariants = document.querySelector('.hidden-cms-variants');
const cmsSelect = document.querySelector('#cms-select');
const cmsOther = cmsVariants.querySelector('.main-controls__input');
const cmsOtherInput = cmsVariants.querySelector('#cms-other-input');


let inputRange = document.querySelector('.rollback input');
let inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let buttonPlus = document.querySelector('.screen-btn');
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
    cmsPercent: 0,
    isBlocked: true,
    
    init: function () {
        this.addTitle();
        this.eventListener();
        startBtn.addEventListener('click', this.start.bind(this));
        resetBtn.addEventListener('click', this.reset.bind(this));
        cms.addEventListener('click', this.openCmsBlock.bind(this));
        cmsSelect.addEventListener('click', this.cmsChange.bind(this));
    },
    
    addTitle: function () {
        document.title = title.textContent;
    },

    start: function() {
        this.screenCheck();

        if (!this.isBlocked) {
            this.addScreens();
            this.addServices();
            this.addPrices();
            this.showResult();
            this.disabledAll();

            this.addNoneBlock(startBtn, resetBtn);
          } else {
            alert('Выберите тип экрана и заполните все поля');
          }
    },

    eventListener: function() {
        buttonPlus = document.querySelector('.screen-btn');
        buttonPlus.addEventListener('click', this.addScreenBlock.bind(this));

        inputRange.addEventListener('input', this.setRollback.bind(this));
    },

    reset: function() {
        this.resetData();
        this.resetForm();
        this.addNoneBlock(resetBtn, startBtn);
        this.eventListener();
        this.cmsReset();
    },

    resetData: function() {
        this.screens = [],
        this.screenPrice = 0, 
        this.adaptive = true,
        this.rollback = 10,
        this.servicePricesNumber = 0,
        this.fullPrice = 0,
        this.servicePercentPrice = 0,
        this.servicesPercent = {},
        this.servicesNumber = {},
        this.countScreens = 0,
        this.isBlocked = true,

        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
        totalCount.value = this.countScreens;
        
        inputRangeValue.textContent = 0 + '%';
    },

    resetForm: function() {
        const mainControls = document.querySelector('.main-controls');
        const screenWrapper = mainControls.querySelector('.main-controls__views.element');
        const checkboxList = mainControls.querySelectorAll('input[type=checkbox]');

        screenWrapper.innerHTML = `<h3>Расчет по типу экрана</h3>
                                  <div class="main-controls__item screen">
                                      <div class="main-controls__select">
                                          <select name="views-select">
                                              <option value="" selected>Тип экранов</option>
                                              <option value="500">Простых 500руб * n</option>
                                              <option value="700">Сложных 700руб * n</option>
                                              <option value="800">Интерактивных 800руб * n</option>
                                              <option value="100">Форм 100руб * n</option>
                                              <option value="300">Слайдеров 300руб * n</option>
                                              <option value="200">Модальные окна 200руб * n</option>
                                              <option value="100">Анимация в блоках 100руб * n</option>
                                          </select>
                                      </div>
                                      <div class="main-controls__input">
                                          <input type="text" placeholder="Количество экранов">
                                      </div>
                                  </div>
                                  <button class="screen-btn">+</button>`;

        checkboxList.forEach(checkbox => {
          checkbox.disabled = false;
          checkbox.checked = false;
        });

        buttonPlus.disabled = false;
        inputRange.disabled = false;
    },
    
    showResult: function() {
        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
        totalCount.value = this.countScreens;
    },

    addNoneBlock: function(btn1, btn2) {
        btn1.style.display = 'none';
        btn2.style.display = 'block';
    },

    openCmsBlock: function() {
        if(cms.checked) {
            cmsVariants.style.display = 'flex';
        } else {
            this.cmsReset();
        }
    },

    cmsReset: function () {
        cmsVariants.style.display = 'none';
        cmsSelect.disabled = false;
        cmsSelect.selectedIndex = 0;
        cmsOtherInput.disabled = false;
        cmsOtherInput.value = 0;
        this.cmsPercent = 0;
      },

    cmsChange: function () {
        const value = cmsSelect.value;
        if (value === 'other') {
            
          cmsOtherInput.addEventListener('input', () => {
            this.cmsPercent = +cmsOtherInput.value;
          });

          cmsOther.style.display = 'flex';
        } else {

          cmsOther.style.display = 'none';
          if (value) {
            this.cmsPercent = +value;
          }

        }
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
        screens = document.querySelectorAll('.screen');

        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },

    setRollback: function () {
        this.rollback = inputRange.value;
        inputRangeValue.textContent = inputRange.value + '%';
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

        this.fullPrice = (this.cmsPercent > 0) ? this.fullPrice + (this.fullPrice * (this.cmsPercent / 100)) 
        : this.fullPrice;

        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
    },
    
    disabledAll: function() {
        const mainControls = document.querySelector('.main-controls');
        const inputList = mainControls.querySelectorAll('input[type=text]');
        const selectList = mainControls.querySelectorAll('select');
        const checkboxList = mainControls.querySelectorAll('input[type=checkbox]');
        inputList.forEach(input => input.disabled = true);
        selectList.forEach(select => select.disabled = true);
        checkboxList.forEach(checkbox => checkbox.disabled = true);

        buttonPlus.disabled = true;
        inputRange.disabled = true;
    },

    logger: () => {
        console.log(this.fullPrice);
        console.log('appData.screenPrice', this.screenPrice);
        console.log(this.servicePercentPrice);
        console.log(this.screens);
        console.log(this.services); 
    },

};



appData.init();



