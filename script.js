'use strict';

const money = +prompt('Ваш месячный доход?','50000'),
      income = 'freelance',
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',''),
      deposit = confirm('Есть ли у вас депозит в банке?'),
      mission = 1500000,
      expenses1 = prompt('Введите обязательную статью расходов?','еда'),
      amount1 = +prompt('Во сколько это обойдется?','5000'),
      expenses2 = prompt('Введите обязательную статью расходов?','жкх'),
      amount2 = +prompt('Во сколько это обойдется?','5000'),
      budgetMonth = money - (amount1 + amount2),
      period = Math.ceil(mission / budgetMonth),
      budgetDay = budgetMonth / 30;

const getExpensesMonth = function(amount1, amount2) {
    return amount1 + amount2;
};

const getAccumulatedMonth = function(){
    return
};

getExpensesMonth();
console.log(budgetMonth);    
console.log(period);
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев.`, `Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(','));
console.log('budgetDay: ', budgetDay);


let getStatusIncome = function(){
    if (budgetDay >= 1200) {
        console.log('У вас высокий уровень дохода');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        console.log('У вас средний уровень дохода');
    } else if (budgetDay < 600) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
        console.log('Что-то пошло не так');
    };
};

getStatusIncome();