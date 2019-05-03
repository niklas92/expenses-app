import catergoryMap from "./expenseCategories";

var classifyExpenses = function(expenses) {
    var classifiedExpenses = new Map();

    for (const [key, val] of expenses.entries()) {
        classifiedExpenses.set(key, monthlyClassification(val));
    }

    return classifiedExpenses;
} 

var monthlyClassification = function(exp) {
    var income = 0;
    var savings = 0;
    //var unclassified = [];
    var expMap = new Map();
    expMap.set("GROCERIES", 0);
    expMap.set("DRUGSTORE", 0);
    expMap.set("APPARTMENT", 0);
    expMap.set("CLOTHES", 0);
    expMap.set("PUBLIC_TRANSPORT", 0);
    expMap.set("TRAVEL", 0);
    expMap.set("BOOKS", 0);
    expMap.set("INSURANCE", 0);
    expMap.set("ATM", 0);
    expMap.set("BAR_CAFE", 0);
    expMap.set("OTHER", 0);

    exp.forEach(e => {
        savings += e.amount;
        var key = classifyEntry(e);
        if(key === "INCOME") {
            income += e.amount;
        } else {
            var newVal = expMap.get(key) + e.amount;
            expMap.set(key, newVal);
        }
    });

    var expArr = [];
    for (const [key, val] of expMap.entries()) {
        expArr.push({category: key, amount: val.toFixed(2) * (-1)});
    }


    return {
        expenseGroups: expArr,
        income: income.toFixed(2),
        savings: savings.toFixed(2),
        //unclassified
    }
} 

var classifyEntry = function(entry) {
    for (const [category, keywords] of catergoryMap.entries()) {
        if(containsKeyword(entry, keywords)){
            return category;
        }
    }
    return "OTHER";
} 

var containsKeyword = function(entry, keywordArray) {
    for(var keyword of keywordArray) {
        if(entry.name.toUpperCase().includes(keyword) || entry.reference.toUpperCase().includes(keyword)) {
            return true;
        }
    }
    return false;
} 

export default classifyExpenses;