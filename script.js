'use strict';

const DomElement = function (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.text = '';
};



//блок описания метода
DomElement.prototype.createElement = function () {
    let element;

    if(this.selector[0] === '.') {
        element = document.createElement('div');
        element.classList.add(this.selector.slice(1));
        this.text = `Это блок с классом ${this.selector}`;
    } 

    if(this.selector[0] === '#') {
        element = document.createElement('p');
        element.setAttribute('id', this.selector.slice(1));
        this.text = `Это параграф с id ${this.selector}`;
    }

    element.style.cssText = `height: ${this.height}px; width: ${this.width}px; background-color: ${this.bg}; font-size: ${this.fontSize}px;`;

    element.textContent = this.text;

    return element;
};



//блок функционала
const newDiv = new DomElement('.block', 350, 650, 'red', 30);
const newP = new DomElement('#paragraph', 80, 650, 'green', 28);


document.body.append(newDiv.createElement());
document.body.append(newP.createElement());