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
    var appartment = 0;
    var groceries = 0;
    var drugstore = 0;
    var clothes = 0;
    var other = 0;
    var savings = 0;
    //var unclassified = [];

    exp.forEach(e => {
        savings += e.amount;
        switch (classifyEntry(e)) {
            case "INCOME":
                income += e.amount;
                break;
            case "APPARTMENT":
                appartment += + e.amount;
                break;
            case "GROCERIES":
                groceries += + e.amount;
                break;
            case "DRUGSTORE":
                drugstore += + e.amount;
                break;
            case "CLOTHES":
                clothes += + e.amount;
                break;
            default:
                other += e.amount;
                //unclassified.push(e);
                break;
        }
    });



    return {
        expenseGroups: [
            {
                name: "Appartment",
                value: appartment.toFixed(2) * (-1)
            },
            {
                name: "Groceries",
                value: groceries.toFixed(2) * (-1)
            },
            {
                name: "Drugstore",
                value: drugstore.toFixed(2) * (-1)
            },
            {
                name: "Clothes",
                value: clothes.toFixed(2) * (-1)
            },
            {
                name: "Other",
                value: other.toFixed(2) * (-1)
            }
        ],
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