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
      expensesName = document.querySelectorAll('.expenses-name'),
      expensesAmount = document.querySelectorAll('.expenses-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      titlePeriodAmount = document.querySelector('.period-amount'),
      cancel = document.querySelector('#cancel');


const isNumber = n => {return !isNaN(parseFloat(n)) && isFinite(n);};

class AppData {
 constructor(){
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }
  start() {
    this.budget = +salaryAmount.value;
  
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
  
    let inputs = document.querySelectorAll('.data input[type=text]');
    inputs.forEach(item => item.disabled = true);
  
  }

  reset () {
    let checked = document.querySelector('#deposit-check');
    checked.checked = false;
    cancel.style.display = 'none';
    startId.style.display = 'inline-block';
    let inputs = document.querySelectorAll('.data input[type=text]'),
        inputsValue = document.querySelectorAll('.result input[type=text]');
  
    inputs.forEach(item => {
      item.disabled = false;
      item.value = '';
    });
    
    inputsValue.forEach(item => item.value = '');
  
    titlePeriodAmount.textContent = '1';
    periodSelect.value = 1;
  }

  showResult() {
    const _this = this;
    budgetMonthValue[0].value = this.budgetMonth;
    budgetDayValue[0].value = this.budgetDay;
    expensesMonthValue[0].value = this.expensesMonth;
    additionalExpensesValue[0].value = this.addExpenses.join(',  ');
    additionalIncomeValue[0].value = this.addIncome.join(',  ');
    targetMonthValue[0].value = this.getTargetMonth();
    incomePeriodValue[0].value = this.calcSavedMoney();
    periodSelect.addEventListener('input', _this.showResult.bind(appData));
    
  }

  addExpensesBlock (){
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlus2);
    expensesItems = document.querySelectorAll('.expenses-items');
  
    if (expensesItems.length === 3) {
        btnPlus2.style.display = 'none';
    }
    
  }

  addIncomeBlock() {
    const incomeItemsClone = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(incomeItemsClone, btnPlus1);
    incomeItems = document.querySelectorAll('.income-items');
  
    if (incomeItems.length === 3) {
        btnPlus1.style.display = 'none';
    }
  }

  getExpenses() {
    const _this = this;
    expensesItems.forEach(item => {
        const itemExpenses = item.querySelector('.expenses-name').value,
              cashExpenses = item.querySelector('.expenses-amount').value;
  
        if (item !== '' && cashExpenses !== '') {
          _this.expenses[itemExpenses] = +cashExpenses;
        }
        console.log('getExpenses', this);
    });
  }

  getIncome() {
    const _this = this;
    incomeItems.forEach(item => {
        const incomeTitle = item.querySelector('.income-title').value,
              incomeAmount = item.querySelector('.income-amount').value;
  
        if (incomeTitle !== '' && incomeAmount !== '') {
          _this.income[incomeTitle] = +incomeAmount;
        }
    });
   
    for (let key in _this.income) {
      _this.incomeMonth += +appData.income[key];
    }
    console.log('getIncome', this);
  }

  getAddExpenses() {
    const _this = this;
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item => {
        item = item.trim();
        if (item !== '') {
          _this.addExpenses.push(item);
        }
    });
  }

  getAddIncome() {
    const _this = this;
    additionalIncomeItem.forEach(item => {
        let itemValuse = item.value.trim();
  
        if (itemValuse  !== '') {
          _this.addIncome.push(itemValuse);
        }
    });
  }

  getExpensesMonth() {
    const _this = this;
    let sum = 0;
    for (let key in appData.expenses) {
        sum += +_this.expenses[key];
    }
    this.expensesMonth = sum;
    return sum;
  }

  getBudget(){
    this.budgetMonth = Math.ceil(this.budget + this.incomeMonth - this.expensesMonth);
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth (){
    const sum = (Math.ceil(targetAmount.value / this.budgetMonth));
  
    if (sum < 0) {
        console.log('Цель достигнута не будет');
    } else {
        console.log('срок достижения цели:', sum + ' месяцев');
    }
    return sum;
  }

  getStatusIncome (){
    if (this.budgetDay >= 1200) {
        return('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
        return('У вас средний уровень дохода');
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
        return('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return('Что-то пошло не так');
    }
  }

  getInfoDeposit() {
    const _this = this;
    if (this.deposit) {
        do {
          _this.percentDeposit = prompt('Какой годовой процент?', '15');
        } while (!isNumber(_this.percentDeposit));
  
        do {
          _this.moneyDeposit = prompt('Какая сумма заложена?');
        } while (!isNumber(_this.moneyDeposit));
    }
  }

  calcSavedMoney () {
    return this.budgetMonth * periodSelect.value;
   }

   addEventListeners() {
    startId.disabled = true;
    const _this = this;
    console.log(this);
    startId.addEventListener('click', _this.start.bind(appData));
    btnPlus2.addEventListener('click', _this.addExpensesBlock);
    btnPlus1.addEventListener('click', _this.addIncomeBlock);
    periodSelect.addEventListener('input', () => {
      titlePeriodAmount.textContent = periodSelect.value;
    });
    salaryAmount.addEventListener('input', () => {
      if (salaryAmount.value !== '') {
          startId.disabled = false;
      } 
    });
    cancel.addEventListener('click', _this.reset);
  }
}

const appData = new AppData();

appData.addEventListeners();
// for(let key in appData) {
//     if (typeof(appData[key]) === 'object'){
//             for (let i in appData[key]) {
//               console.log(`Наша программа включает в себя данные: ${i} : ${appData[key][i]}`);
//             } 
//     } else {
//         console.log(`Наша программа включает в себя данные: ${key} : ${appData[key]}`);
//     }
// }

// let words = appData.addExpenses.join(',');

// const solution = function(text) {
// let str = '';
//   for (let i = 0; i <= text.length - 1; i+=1 ) {
//     if (text[i - 1] == 0 || text[i - 1] === undefined) {
//      str += text[i].toUpperCase(); 
//     } else str += text[i];
//   }
//   return str;
// };