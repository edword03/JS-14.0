'use strict';
let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');
const startId = document.getElementById('start'),
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
      incomeTitle = document.querySelectorAll('.income-title'),
      incomeAmount = document.querySelector('.income-amount'),
      additionalIncomeItem1 = document.querySelector('.additional_income-item'),
      additionalIncomeItem2 = document.querySelector('.additional_income-item'),
      expensesName = document.querySelector('.expenses-name'),
      expensesAmount = document.querySelector('.expenses-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      titlePeriodAmount = document.querySelector('.period-amount'),
      cancel = document.querySelector('#cancel');


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
        this.budget = +salaryAmount.value;
        console.log(this);

        if (salaryAmount.value === '') {
          alert('Заполните поле!');
          return;
        }
        
        this.getExpenses();
        this.getAddExpenses();
        this.getIncome();
        this.getAddIncome();
        this.getExpensesMonth();
        this.getBudget();
        this.getInfoDeposit();
  
        this.showResult();

        startId.style.display = 'none';
        cancel.style.display = 'inline-block';

        salaryAmount.disabled = true;
        incomeTitle[1].disabled = true;
        incomeAmount.disabled = true;
        additionalIncomeItem[0].disabled = true;
        additionalIncomeItem[1].disabled = true;
        expensesName.disabled = true;
        expensesAmount.disabled = true;
        additionalExpensesItem.disabled = true;
        targetAmount.disabled = true;

    },
    reset: function() {
      cancel.style.display = 'none';
      startId.style.display = 'inline-block';

      salaryAmount.value = '';
      incomeTitle[1].value = '';
      incomeAmount.value = '';
      additionalIncomeItem[0].value = '';
      additionalIncomeItem[1].value = '';
      expensesName.value = '';
      expensesAmount.value = '';
      additionalExpensesItem.value = '';
      targetAmount.value = '';

      salaryAmount.disabled = false;
      incomeTitle[1].disabled = false;
      incomeAmount.disabled = false;
      additionalIncomeItem[0].disabled = false;
      additionalIncomeItem[1].disabled = false;
      expensesName.disabled = false;
      expensesAmount.disabled = false;
      additionalExpensesItem.disabled = false;
      targetAmount.disabled = false;

      salaryAmount.value = '';
      budgetMonthValue[0].value = '';
      budgetDayValue[0].value = '';
      expensesMonthValue[0].value = '';
      additionalExpensesValue[0].value = '';
      additionalIncomeValue[0].value  = '';
      targetMonthValue[0].value = '';
      incomePeriodValue[0].value = '';
      periodSelect.value = '';
      titlePeriodAmount.textContent = '1';
      periodSelect.value = 1;
    },
    showResult: function() {
        budgetMonthValue[0].value = this.budgetMonth;
        budgetDayValue[0].value = this.budgetDay;
        expensesMonthValue[0].value = this.expensesMonth;
        additionalExpensesValue[0].value = this.addExpenses.join(',  ');
        additionalIncomeValue[0].value = this.addIncome.join(',  ');
        targetMonthValue[0].value = this.getTargetMonth();
        incomePeriodValue[0].value = this.calcSavedMoney();
        periodSelect.addEventListener('input', appData.showResult.bind(appData));
        console.log(this);
    },
    addExpensesBlock: function(){
        
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlus2);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            btnPlus2.style.display = 'none';
        }
        console.log(this);
    },
    addIncomeBlock: function() {
        const incomeItemsClone = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(incomeItemsClone, btnPlus1);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            btnPlus1.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            const itemExpenses = item.querySelector('.expenses-name').value,
                  cashExpenses = item.querySelector('.expenses-amount').value;

            if (item !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
            console.log('getExpenses', this);
        });
    },
    getIncome: function() {
        incomeItems.forEach(function(item){
            const incomeTitle = item.querySelector('.income-title').value,
                  incomeAmount = item.querySelector('.income-amount').value;

            if (incomeTitle !== '' && incomeAmount !== '') {
                appData.income[incomeTitle] = +incomeAmount;
            }
        });
       
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
        console.log('getIncome', this);
    },
    getAddExpenses: function() {
        const addExpenses = additionalExpensesItem.value.split(',');
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
        this.expensesMonth = sum;
        console.log('getExpensesMonth', this);
        return sum;
    },
    getBudget: function(){
        this.budgetMonth = Math.ceil(this.budget + this.incomeMonth - this.expensesMonth);
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function(){
        const sum = (Math.ceil(targetAmount.value / this.budgetMonth));
    
        if (sum < 0) {
            console.log('Цель достигнута не будет');
        } else {
            console.log('срок достижения цели:', sum + ' месяцев');
        }
        return sum;
    },
    getStatusIncome: function(){
        if (this.budgetDay >= 1200) {
            return('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return('У вас средний уровень дохода');
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            return('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return('Что-то пошло не так');
        }
    },
    getInfoDeposit: function() {
        if (this.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '15');
            } while (!isNumber(appData.percentDeposit));

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?');
            } while (!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function() {
       return this.budgetMonth * periodSelect.value;
    },
};
startId.disabled = true;

startId.addEventListener('click', appData.start.bind(appData));
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
cancel.addEventListener('click', appData.reset);

for(let key in appData) {
    if (typeof(appData[key]) === 'object'){
            for (let i in appData[key]) {
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