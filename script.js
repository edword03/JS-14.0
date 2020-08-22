'use strict';

let startId = document.getElementById('start'),
      btnPlus1 = document.getElementsByTagName('button')[0],
      btnPlus2 = document.getElementsByTagName('button')[1],
      depositCheck = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      budgetDayValue = document.getElementsByClassName('budget_day-value'),
      budgetMonthValue = document.getElementsByClassName('budget_month-value'),
      expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
      additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
      incomePeriodValue = document.getElementsByClassName('income_period-value'),
      targetMonthValue = document.getElementsByClassName('target_month-value'),
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-title'),
      incomeItems = document.querySelectorAll('.income-items'),
      additionalIncomeItem1 = document.querySelector('.additional_income-item'),
      additionalIncomeItem2 = document.querySelector('.additional_income-item'),
      expensesName = document.querySelector('.expenses-name'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      titlePeriodAmount = document.querySelector('.period-amount');


const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0, 
    period: 3,
    start: function() {
        appData.budget = +salaryAmount.value;

        
        appData.getExpenses();
        appData.getAddExpenses();
        appData.getIncome();
        appData.getAddIncome();
        appData.getExpensesMonth();
        appData.getBudget();
        // appData.getStatusIncome();
        // appData.getTargetMonth();
        // appData.getInfoDeposit();

        appData.showResult();

    },
    showResult: function() {
        budgetMonthValue[0].value = appData.budgetMonth;
        budgetDayValue[0].value = appData.budgetDay;
        expensesMonthValue[0].value = appData.expensesMonth;
        additionalExpensesValue[0].value = appData.addExpenses.join(',  ');
        additionalIncomeValue[0].value = appData.addIncome.join(',  ');
        targetMonthValue[0].value = appData.getTargetMonth();
        incomePeriodValue[0].value = appData.calcSavedMoney();

        periodSelect.addEventListener('input', appData.showResult);
    },
    addExpensesBlock: function(){
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlus2);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            btnPlus2.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
        let incomeItemsClone = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(incomeItemsClone, btnPlus1);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            btnPlus1.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-name').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if (item !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItems.forEach(function(item){
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;

            if (incomeTitle !== '' && incomeAmount !== '') {
                appData.income[incomeTitle] = +incomeAmount;
            }
        });
       
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item){
            let itemValuse = item.value.trim();

            if (itemValuse  !== '') {
                appData.addIncome.push(itemValuse);
            }
        });
    },
    budget: 0,
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
        appData.budgetMonth = Math.ceil(appData.budget + appData.incomeMonth - appData.expensesMonth);
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
        const sum = (Math.ceil(targetAmount.value / appData.budgetMonth));
    
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
            } while (!isNumber(appData.percentDeposit));

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?');
            } while (!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function() {
       return appData.budgetMonth * periodSelect.value;
    },
    checkInput: function() {

    }
};
    
startId.disabled = true;

startId.addEventListener('click', appData.start);
btnPlus2.addEventListener('click', appData.addExpensesBlock);
btnPlus1.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function(){
    titlePeriodAmount.textContent = periodSelect.value;
});
salaryAmount.addEventListener('input', function(){
    if (salaryAmount.value !== '') {
        startId.disabled = false;
    }
});

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