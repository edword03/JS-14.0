'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money,
      income = 'freelance',
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',''),
      deposit = confirm('Есть ли у вас депозит в банке?'),
      mission = 1500000;
    

let start = function() {
    // money = prompt('Ваш месячный доход?');

    // while(!isNumber(money)) {
    //     money = prompt('Ваш месячный доход?');
    // }
    do {
        money = prompt('Ваш месячный доход?');
    } while(!isNumber(money))

};

start();

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

let expenses = [];

let getExpensesMonth = function() {
    let sum;
    // let cost;
    for (let i = 0; i < 2; i++) {
        expenses[i]  = prompt('Введите обязательную статью расходов?','еда');
        
        do {
            sum = +prompt('Во сколько это обойдется?');
        } while (!sum != null && !sum != '' && !sum != isNaN )
    }
    console.log(expenses);
    return sum += sum;
};

let expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function(){
    
    return (money - expensesAmount);
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function(){
    const sum = (Math.ceil(mission / accumulatedMonth));

    if (sum < 0) {
        console.log('Цель достигнута не будет');
    } else {
        console.log('срок достижения цели:', sum + ' месяцев');
    }
    return sum;
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
        
console.log('Рассходы за месяц:', expensesAmount);
let period = getTargetMonth();
let budgetDay = Math.floor(accumulatedMonth / 30);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев.`, `Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(','));
console.log('budgetDay: ', budgetDay);

        
        
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