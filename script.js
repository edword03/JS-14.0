'use strict';

const money = +prompt('Ваш месячный доход?','50000'),
      income = 'freelance',
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',''),
      deposit = confirm('Есть ли у вас депозит в банке?'),
      mission = 1500000,
      expenses1 = prompt('Введите обязательную статью расходов?','еда'),
      amount1 = +prompt('Во сколько это обойдется?','5000'),
      expenses2 = prompt('Введите обязательную статью расходов?','жкх'),
      amount2 = +prompt('Во сколько это обойдется?','5000');
      
let showTypeOf = function(data){
    console.log(data, typeof(data));
};
let getExpensesMonth = function(){
    const sum = amount1 + amount2;
    return sum;
};
const getAccumulatedMonth = function(){
    const sum = money - (amount1 + amount2);
    return sum;
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function(){
    const sum = (mission / accumulatedMonth);
    return sum;
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
        
console.log('Рассходы за месяц:', getExpensesMonth());
let period = Math.ceil(mission / accumulatedMonth);
let budgetDay = Math.floor(accumulatedMonth / 30);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев.`, `Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(','));
console.log('budgetDay: ', budgetDay);
console.log('срок достижения цели:', getTargetMonth());
        
        
let getStatusIncome = function(){
    if (budgetDay >= 1200) {
        return('У вас высокий уровень дохода');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return('У вас средний уровень дохода');
    } else if (budgetDay < 600) {
        return('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
        return('Что-то пошло не так');
    }
};

console.log(getStatusIncome());