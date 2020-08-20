const adv = document.querySelector('.adv'),
      book = document.querySelectorAll('.book'),
      body = document.querySelector('body'),
      book2 = book[0].querySelectorAll('li'),
      book5 = book[5].querySelectorAll('li'),
      book3Link = book[4].querySelector('a'),
      chapter8 = document.createElement('li'),
      book6 = book[2].querySelectorAll('li');

chapter8.textContent = 'Глава 8: За пределами ES6';
book6[8].append(chapter8);
book[0].insertAdjacentElement('beforebegin', book[1]);
book[2].insertAdjacentElement('beforebegin', book[4]);
book[2].insertAdjacentElement('beforebegin', book[3]);
book[2].insertAdjacentElement('beforebegin', book[5]);

book2[4].insertAdjacentElement('beforebegin', book2[6]);
book2[4].insertAdjacentElement('beforebegin', book2[8]);
book2[9].insertAdjacentElement('afterend', book2[2]);

book5[2].insertAdjacentElement('beforebegin', book5[9]);
book5[9].insertAdjacentElement('afterend', book5[3]);
book5[2].insertAdjacentElement('beforebegin', book5[4]);
book5[7].insertAdjacentElement('afterend', book5[5]);
adv.remove();

book3Link.textContent = 'Книга 3. this и Прототипы Объектов';

console.log(book);
console.log(book2);
console.log(book6);
console.log(chapter8);
body.style = 'background-image: url(./image/you-dont-know-js.jpg)';