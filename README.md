# Expense App

This is a React Application to analyse and classify your monthly expenses based on your bank statement in CSV format.

## Classification

The app has following default categories of expenses:

- INCOME - Not part of the analsis of expenses and only used for monhtly savings calculation
- DRUGSTORE
- APPARTMENT
- CLOTHES
- PUBLIC_TRANSPORT
- TRAVEL
- BOOKS
- INSURANCE
- ATM
- BAR_CAFE
- SAVINGS
- OTHER - everything that does not fit in the above categories

### Customizing classification categories

In order to introduce your own categories or to add keywords to a categorie you need to alter the file `src/actions/expenseCategories.js`

For a new category add a new set in the following format (make sure to write Strings in all caps):<br>
`catergoryMap.set("CATEGORY_NAME", ["KEYWORD1", "KEYWORD2"]);`

To extend an existing category just add the keyword to the array of the set.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
