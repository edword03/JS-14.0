
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
    cancel = document.querySelector('#cancel'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');


const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

class AppData {
    constructor() {
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
        this.getInfoDeposit();
        this.getBudget();

        this.showResult();

        startId.style.display = 'none';
        cancel.style.display = 'inline-block';

        const inputs = document.querySelectorAll('.data input[type=text]');
        inputs.forEach(item => item.disabled = true);

    }

    reset() {
        this.income = {};
        this.addIncome = [];
        this.incomeMonth = 0;
        this.expenses = {};
        this.addExpenses = [];
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.deposit = false;

        const checked = document.querySelector('#deposit-check');
        checked.checked = false;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositBank.value = '';
        cancel.style.display = 'none';
        startId.style.display = 'inline-block';
        const inputs = document.querySelectorAll('.data input[type=text]'),
            inputsValue = document.querySelectorAll('.result input[type=text]');

        inputs.forEach(item => {
            item.disabled = false;
            item.value = '';
        });

        inputsValue.forEach(item => item.value = '');

        titlePeriodAmount.textContent = '1';
        periodSelect.value = 1;

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length > 1) {
            for (let i = expensesItems.length - 1; i >= 1; i--) {
                if (expensesItems[i].parentNode) {
                    expensesItems[i].parentNode.removeChild(expensesItems[i]);
                }
            }
        }

        btnPlus2.style.display = 'block';

        incomeItems = document.querySelectorAll('.income-items');
        if (expensesItems.length > 1) {
            for (let i = incomeItems.length - 1; i >= 1; i--) {
                if (incomeItems[i].parentNode) {
                    incomeItems[i].parentNode.removeChild(incomeItems[i]);
                }
            }
        }
        btnPlus1.style.display = 'block';
    }

    showResult() {
        budgetMonthValue[0].value = this.budgetMonth;
        budgetDayValue[0].value = this.budgetDay;
        expensesMonthValue[0].value = this.expensesMonth;
        additionalExpensesValue[0].value = this.addExpenses.join(',  ');
        additionalIncomeValue[0].value = this.addIncome.join(',  ');
        targetMonthValue[0].value = this.getTargetMonth();
        incomePeriodValue[0].value = this.calcSavedMoney();
        periodSelect.addEventListener('change', () => {
            incomePeriodValue.value = this.calcSavedMoney();
        });
    }

    addExpensesBlock() {
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

        for (const key in _this.income) {
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
            const itemValuse = item.value.trim();

            if (itemValuse  !== '') {
                _this.addIncome.push(itemValuse);
            }
        });
    }

    getExpensesMonth() {
        const _this = this;
        let sum = 0;
        for (const key in appData.expenses) {
            sum += +_this.expenses[key];
        }
        this.expensesMonth = sum;
        return sum;
    }

    getBudget() {
        const depositMonth = this.moneyDeposit * (this.percentDeposit / 100);

        this.budgetMonth = Math.ceil(this.budget + this.incomeMonth - this.expensesMonth + depositMonth);
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        const sum = (Math.ceil(targetAmount.value / this.budgetMonth));

        if (sum < 0) {
            console.log('Цель достигнута не будет');
        } else {
            console.log('срок достижения цели:', sum + ' месяцев');
        }
        return sum;
    }

    getStatusIncome() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = +depositPercent.value;
            this.moneyDeposit = +depositAmount.value;
        }
    }

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }
    changePersent() {
        const selectIndex = this.value;
        if (selectIndex === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
        } else {
            depositPercent.value = selectIndex;
            depositPercent.style.display = 'none';
        }
    }
    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePersent);
            depositPercent.addEventListener('input', () => {
                if (depositPercent.value === '' || depositPercent.value < 0 || depositPercent.value > 100) {
                    alert('Введите корректное значение в поле проценты');
                    startId.disabled = true;
                } else {
                    startId.disabled = false;
                }
            });
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            this.deposit = false;
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            depositBank.removeEventListener('change', this.changePersent);
        }

    }

    addEventListeners() {
        startId.disabled = true;
        console.log(this);
        startId.addEventListener('click', this.start.bind(this));
        btnPlus2.addEventListener('click', this.addExpensesBlock);
        btnPlus1.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('input', () => {
            titlePeriodAmount.textContent = periodSelect.value;
        });
        salaryAmount.addEventListener('input', () => {
            if (salaryAmount.value !== '') {
                startId.disabled = false;
            }
        });
        cancel.addEventListener('click', this.reset.bind(this));

        depositCheck.addEventListener('click', this.depositHandler.bind(this));
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
