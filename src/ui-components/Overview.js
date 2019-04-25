import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SimpleLineChart from './SimpleLineChart.js';
import SimpleTable from './SimpleTable.js';
import {processData, getMonthlyExpenses, calculateAverageExpense} from '../actions/parseCSV';
import CSVReader from 'react-csv-reader';

const styles = theme => ({ 
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
});

class Overview extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      expenseData: [], 
      tableData: [], 
      monthlyAverage: 0
    };
  }

  handleForce = data => {
    const processedData = processData(data);
    this.setState({
      expenseData: processedData,
      tableData: getMonthlyExpenses(processedData),
      monthlyAverage: calculateAverageExpense(processedData)
    });
  };

  render() {
    const { classes } = this.props;

    return (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <CSVReader
            cssClass="react-csv-input"
            label="Select Expenses CSV"
            onFileLoaded={this.handleForce}
          />
          <Typography variant="h4" gutterBottom component="h2">
            Orders
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <SimpleLineChart tableData={this.state.tableData} monthlyAverage={this.state.monthlyAverage} />
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Monthly Savings
          </Typography>
          <div className={classes.tableContainer}>
            <SimpleTable tableData={this.state.tableData} monthlyAverage={this.state.monthlyAverage}/>
          </div>
        </main>
    );
  }
}

export default withStyles(styles)(Overview);