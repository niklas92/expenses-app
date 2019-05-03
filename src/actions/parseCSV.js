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
  
var getMonthlyExpenses = function (dataMap) {
    var expenses = [];
    for (const [key, val] of dataMap.entries()) {
        expenses.push({month: key, amount: val.savings});
    }
    return expenses;
}

var calculateAverageExpense = function (dataMap) {
    var expenses = [];
    // eslint-disable-next-line
    for (const [key, val] of dataMap.entries()) {
        expenses.push(val.savings);
    }
    return (expenses.reduce((acc, e) => acc + Number(e), 0) / expenses.length).toFixed(2);
}

var processData = function(data) {
    const expenses = prepareData(data);

    const classExp = classifyExpenses(expenses);

    return {
        expenses,
        classExp,
        monExp: getMonthlyExpenses(classExp),
        monAvg: calculateAverageExpense(classExp)
    }
}

export {processData, calculateAverageExpense, getMonthlyExpenses};
