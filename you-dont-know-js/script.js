// Заменить картинку заднего фона на другую из папки image
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// Удалить рекламу со страницы
document.querySelector('.adv').remove();


// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
const books = document.querySelectorAll('.book');
books[4].querySelector('h2 a').textContent = 'Книга 3. this и Прототипы Объектов';


// Восстановить порядок книг
books[0].before(books[1]);
books[0].after(books[4]);
books[2].before(books[3]);
books[3].after(books[5]);



// Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
const list1 =  books[0].querySelectorAll('li');
list1[3].after(list1[6]);
list1[6].after(list1[8]);

/////////////////////////////////////////////////

const list2 = books[5].querySelectorAll('li');
list2[2].before(list2[9]);
list2[2].before(list2[3]);
list2[2].before(list2[4]);



// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
let list3;
const book6 = books[2].querySelector('ul');
const elemLi = document.createElement('li');

elemLi.textContent = 'Глава 8: За пределами ES6';
book6.append(elemLi);

list3 = books[2].querySelectorAll('li');
list3[9].before(list3[10]);