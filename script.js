'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money,
      income = 'freelance',
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',''),
      deposit = confirm('Есть ли у вас депозит в банке?'),
      mission = 1500000;
    

const start = function() {
    // money = prompt('Ваш месячный доход?');

    // while(!isNumber(money)) {
    //     money = prompt('Ваш месячный доход?');
    // }
    do {
        money = prompt('Ваш месячный доход?');
    } while(!isNumber(money))

};

start();

const showTypeOf = function(data) {
    console.log(data, typeof(data));
};

let expenses1,
    expenses2;

const getExpensesMonth = function() {
    let sum = 0,
        cost;
    for (let i = 0; i < 2; i++) {
        
        if (i === 0) {
            expenses1  = prompt('Введите обязательную статью расходов?','еда');
        } else {
            expenses2  = prompt('Введите обязательную статью расходов?','еда');
        }

        do {
            cost = prompt('Во сколько это обойдется?');
        } while (!isNumber(cost))

        sum += +cost;
    }
    // console.log(sum);
    return sum;
};

let expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function(){
    
    return (money - expensesAmount);
},

    accumulatedMonth = getAccumulatedMonth(),

    getTargetMonth = function(){
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
let period = getTargetMonth(),
    budgetDay = Math.floor(accumulatedMonth / 30);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев.`, `Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(','));
console.log('budgetDay: ', budgetDay);

        
        
const getStatusIncome = function(){
    if (budgetDay >= 1200) {
        return('У вас высокий уровень дохода');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay >= 0) {
        return('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return('Что-то пошло не так');
    }
};

console.log(getStatusIncome());