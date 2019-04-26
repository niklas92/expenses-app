import catergoryMap from "./expenseCategories";
import { switchCase } from "@babel/types";

var classifyExpenses = function(expenses) {
    var classifiedExpenses = new Map();

    for (const [key, val] of expenses.entries()) {
        classifiedExpenses.set(key, monthlyClassification(val));
    }

    return classifiedExpenses;
} 

var monthlyClassification = function(exp) {
    var income = 0;
    var groceries = 0;
    var other = 0;
    var unclassified = [];

    exp.forEach(e => {
        switch (classifyEntry(e)) {
            case "INCOME":
                income += e.amount;
                break;
            case "GROCERIES":
                groceries += + e.amount;
                break;
            default:
                other += e.amount;
                unclassified.push(e);
                break;
        }
    });

    var total = income + groceries + other;

    return {
        income: income.toFixed(2),
        groceries: groceries.toFixed(2),
        other: other.toFixed(2),
        total: total.toFixed(2),
        unclassified
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