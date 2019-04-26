import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SimpleLineChart from './SimpleLineChart.js';
import SimpleTable from './SimpleTable.js';

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
  render() {
    const { classes } = this.props;

    return (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            Orders
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <SimpleLineChart tableData={this.props.monthlyExpenses} monthlyAverage={this.props.monthlyAverage} />
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Monthly Savings
          </Typography>
          <div className={classes.tableContainer}>
            <SimpleTable tableData={this.props.monthlyExpenses} monthlyAverage={this.props.monthlyAverage}/>
          </div>
        </main>
    );
  }
}

export default withStyles(styles)(Overview);