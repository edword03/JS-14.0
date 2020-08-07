let money = 150000;
let income = 'freelance';
let addExpenses = 'Еда, Жилье, ТелеФон, интЕрнет';
let deposit = true;
let mission = 1000000;
let period = 12,
    budgetDay = money / 30;
    
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев.`, `Цель заработать ${mission} долларов`);
console.log(addExpenses.toLowerCase().split());
console.log('budgetDay: ', budgetDay);