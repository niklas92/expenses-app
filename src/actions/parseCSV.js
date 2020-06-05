import moment from "moment";
import classifyExpenses from "./classification";
import bankMap from "./bankFormat";

var prepareData = function (expenses, format) {
  return (
    expenses
      // format into object & filter out irrelevant entries
      .map((e) => {
        //filter out header fields
        if (
          e.length >=
          Math.max(format.date, format.name, format.reference, format.amount) +
            1
        ) {
          let amountStr = e[format.amount].replace(".", "").replace(",", ".");

          //filter out irrelevent entries with no value in amount
          return !isNaN(amountStr)
            ? {
                date: moment(e[format.date], "DD.MM.YYYY"),
                name: e[format.name],
                reference: e[format.reference],
                amount: Number(amountStr),
              }
            : null;
        } else {
          return null;
        }
      })
      // filter null entries
      .filter((e) => !!e)
      // map all months together
      .reduce((acc, exp) => {
        let arr = acc.get(exp.date.month() + 1 + "." + exp.date.year());
        if (!arr) {
          acc.set(exp.date.month() + 1 + "." + exp.date.year(), [exp]);
        } else {
          arr.push(exp);
        }
        return acc;
      }, new Map())
  );
};

var getMonthlyExpenses = function (dataMap) {
  var expenses = [];
  for (const [key, val] of dataMap.entries()) {
    expenses.push({ month: key, amount: val.savings });
  }
  return expenses;
};

// Monthly average of savings or overdraft (income included)
var calculateAverageSavings = function (dataMap) {
  var expenses = [];

  for (const [, val] of dataMap.entries()) {
    expenses.push(val.savings);
  }
  return (
    expenses.reduce((acc, e) => acc + Number(e), 0) / expenses.length
  ).toFixed(2);
};

// Monthly average of expenses (income not included)
var calculateAverageExpense = function (dataMap) {
  var expenses = [];

  for (const [, val] of dataMap.entries()) {
    expenses.push(val.totalExp);
  }
  return (
    expenses.reduce((acc, e) => acc + Number(e), 0) / expenses.length
  ).toFixed(2);
};

var calculateCategoryAverage = function (dataMap) {
  const categoryMap = new Map();
  const categoryArray = [];

  for (const [, val] of dataMap.entries()) {
    for (const e in val.expenseGroups) {
      const exp = val.expenseGroups[e];
      const oldVal = categoryMap.get(exp.category);
      const newVal = oldVal ? oldVal + exp.amount : exp.amount;
      categoryMap.set(exp.category, newVal);
    }
  }

  for (const [key, val] of categoryMap.entries()) {
    categoryArray.push({
      category: key,
      amount: Number((val / dataMap.size).toFixed(2)),
    });
  }

  return categoryArray;
};

var processData = function (data, bank) {
  const expenses = prepareData(data, bankMap.get(bank));

  const classExp = classifyExpenses(expenses);

  return {
    expenses,
    classExp,
    monExp: getMonthlyExpenses(classExp),
    monAvgSav: calculateAverageSavings(classExp),
    monAvgExp: calculateAverageExpense(classExp),
    catAvg: calculateCategoryAverage(classExp),
  };
};

export {
  processData,
  calculateAverageSavings,
  calculateAverageExpense,
  getMonthlyExpenses,
};
