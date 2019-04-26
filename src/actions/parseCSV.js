import moment from 'moment';
import classifyExpenses from './classification';

var prepareData = function (expenses) {

    return expenses.map(e => ({
        date: moment(e[0], "DD.MM.YYYY"),
        name: e[2],
        reference: e[4],
        amount: Number(e[7].replace('.','').replace(',','.'))
    }))
        .reduce((acc, exp) => {
            let arr = acc.get((exp.date.month()+1) + "." + exp.date.year());
            if(!arr){
                acc.set((exp.date.month()+1) + "." + exp.date.year(), [exp])
            } else {
                arr.push(exp)
            }
            return acc;
        }, new Map());
}

var calculateMonthlyExpenses = function (expenses) {
    let monthlyExpense = expenses.reduce((acc, e) => acc + e.amount, 0).toFixed(2);
    return monthlyExpense;
  }
  
var getMonthlyExpenses = function (dataMap) {
    var expenses = [];
    for (const [key, val] of dataMap.entries()) {
        expenses.push({month: key, amount: calculateMonthlyExpenses(val)});
    }
    return expenses;
}

var calculateAverageExpense = function (dataMap) {
    var expenses = [];
    // eslint-disable-next-line
    for (const [key, val] of dataMap.entries()) {
        expenses.push(calculateMonthlyExpenses(val));
    }
    return (expenses.reduce((acc, e) => acc + Number(e), 0) / expenses.length).toFixed(2);
}

var processData = function(data) {
    const expenses = prepareData(data);

    console.log(classifyExpenses(expenses));

    return {
        expenses,
        monExp: getMonthlyExpenses(expenses),
        monAvg: calculateAverageExpense(expenses)
    }
}

export {processData, calculateAverageExpense, getMonthlyExpenses};
