import catergoryMap from "./expenseCategories";

var classifyExpenses = function (expenses) {
  var classifiedExpenses = new Map();

  for (const [key, val] of expenses.entries()) {
    classifiedExpenses.set(key, monthlyClassification(val));
  }

  return classifiedExpenses;
};

var monthlyClassification = function (exp) {
  var income = 0;
  var savings = 0;
  var totalExp = 0;
  var expMap = new Map();

  exp.forEach((e) => {
    savings += e.amount;
    var key = classifyEntry(e);
    if (key === "INCOME") {
      income += e.amount;
    } else {
      totalExp += e.amount;
      var oldVal = expMap.get(key);

      if (!oldVal) {
        oldVal = { amount: 0, entries: [] };
      }

      var newVal = {
        amount: oldVal.amount + e.amount,
        entries: oldVal.entries.concat(e),
      };
      expMap.set(key, newVal);
    }
  });

  var expArr = [];
  for (const [key, val] of expMap.entries()) {
    expArr.push({
      category: key,
      amount: val.amount.toFixed(2) * -1,
      entries: val.entries,
    });
  }

  return {
    expenseGroups: expArr,
    income: income.toFixed(2),
    savings: savings.toFixed(2),
    totalExp: totalExp.toFixed(2),
  };
};

var classifyEntry = function (entry) {
  for (const [category, keywords] of catergoryMap.entries()) {
    if (containsKeyword(entry, keywords)) {
      return category;
    }
  }
  return "OTHER";
};

var containsKeyword = function (entry, keywordArray) {
  for (var keyword of keywordArray) {
    if (
      entry.name.toUpperCase().includes(keyword) ||
      entry.reference.toUpperCase().includes(keyword)
    ) {
      return true;
    }
  }
  return false;
};

export default classifyExpenses;
