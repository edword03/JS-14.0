'use strict';

const money = +prompt('Ваш месячный доход?',''),
      income = 'freelance',
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','');
let deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 1500000,
    expenses1 = prompt('Введите обязательную статью расходов?',''),
    amount1 = +prompt('Во сколько это обойдется?',''),
    expenses2 = prompt('Введите обязательную статью расходов?',''),
    amount2 = +prompt('Во сколько это обойдется?',''),
    budgetMonth = money - (amount1 + amount2),
    period = Math.ceil(mission / budgetMonth),
    budgetDay = Math.floor(budgetMonth / 30);

console.log(budgetMonth);    
console.log(period);
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев.`, `Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(','));
console.log('budgetDay: ', budgetDay);

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
    console.log('Что-то пошло не так');
};