'use strict';

const list = document.getElementById('list');
const selectCars = document.getElementById('cars');

let carsObj = {};

const showCar = (car) => {
    const elementOne = document.createElement('li');
    const elementTwo = document.createElement('li');

    elementOne.textContent = `Тачка ${car.brand} ${car.model}`;
    elementTwo.textContent = `Цена: ${car.price}`;
    list.append(elementOne);
    list.append(elementTwo);
};

selectCars.addEventListener('change', () => {
    const option = selectCars.options[selectCars.selectedIndex];
    list.innerHTML = '';

    if(option.value === 'bmw') {
        showCar(carsObj[selectCars.selectedIndex - 1]);
    } else if(option.value === 'volvo') {
        showCar(carsObj[selectCars.selectedIndex - 1]);
    }

});


const getCars = (url) => {
    return fetch(url).then(res => res.json());
};


getCars('cars.json').then(data => {
    carsObj = data.cars;
}).catch(error => {
    console.dir(error.message);
});

    
