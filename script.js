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
    percentDeposit: 0,
    moneyDeposit: 0, 
    mission: 1500000,
    period: 3,
    asking: function() {
        if (confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome;
            do{
                itemIncome = prompt('Какой у вас дополнительный источник заработка?', '');
            } while(isNumber(+itemIncome))
            let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');

            while (!isNumber(cashIncome)) {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
            }
            appData.income[itemIncome] = +cashIncome;
        }

        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','');
        appData.addExpenses = appData.addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let sum = 0,
            ask;
        for (let i = 0; i < 2; i++) {
            do{
                ask = prompt('Введите обязательную статью расходов?','еда');
            }while(isNumber(+ask))

            
            do {
                sum = prompt('Во сколько это обойдется?');
            } while (!isNumber(sum))
            appData.expenses[ask] = +sum;
        }
        return sum;
    },
    budget: +money,
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
        appData.budgetMonth = Math.ceil(appData.budget - appData.expensesMonth);
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '15');
            } while (!isNumber(appData.percentDeposit))

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?')
            } while (!isNumber(appData.moneyDeposit))
        }
    },
    calcSavedMoney: function() {
       return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();
appData.getTargetMonth();
appData.getInfoDeposit();


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

let words = appData.addExpenses.join(',');

const solution = function(text) {
let str = '';
  for (let i = 0; i <= text.length - 1; i+=1 ) {
    if (text[i - 1] == 0 || text[i - 1] === undefined) {
     str += text[i].toUpperCase(); 
    } else str += text[i];
  }
  return str;
};
console.log(solution(words));


// console.log(str);
