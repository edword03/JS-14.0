'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
},
    start = function() {
        do {
            money = prompt('Ваш месячный доход?');
        } while(!isNumber(money))
    };

let money;

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 1500000,
    period: 3,
    asking: function() {
        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','');
        appData.addExpenses = appData.addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let sum,
            ask;
        for (let i = 0; i < 2; i++) {
            ask = prompt('Введите обязательную статью расходов?','еда');
            
            do {
                sum = prompt('Во сколько это обойдется?');
            } while (!isNumber(sum))
            appData.expenses[ask] = sum;
        }
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() {
        let sum = 0;
        for (let key in appData.expenses) {
            sum += +appData.expenses[key];
        }
        appData.expensesMonth = sum;
        // console.log(sum);
        return sum;
    },
    getBudget: function(){
        appData.budgetMonth = Math.round(appData.budget - appData.expensesMonth);
        appData.budgetDay = Math.round(appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
        const sum = (Math.ceil(appData.mission / appData.budgetMonth));
    
        if (sum < 0) {
            console.log('Цель достигнута не будет');
        } else {
            console.log('срок достижения цели:', sum + ' месяцев');
        }
        return sum;
    },
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200) {
            return('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return('У вас средний уровень дохода');
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return('Что-то пошло не так');
        }
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();
appData.getTargetMonth();


console.log('Рассходы за месяц:', appData.expensesMonth);
console.log(appData);
console.log(appData.getStatusIncome());

for(let key in appData) {
    if (typeof(appData[key]) === 'object'){
            for (let i in appData[key]) {
            //   console.log(`Вывести ${i} и второе значение: ${obj[key][i]}`);
              console.log(`Наша программа включает в себя данные: ${i} : ${appData[key][i]}`);
            } 
    } else {
        console.log(`Наша программа включает в себя данные: ${key} : ${appData[key]}`);
    }
}