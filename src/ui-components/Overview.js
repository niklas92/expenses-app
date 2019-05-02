import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
    paddingTop: '16px',
    marginLeft: '-22px'
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
          <Typography color="textSecondary" variant="h4" gutterBottom component="h2">Overview</Typography>
          
          <Card className={classes.card}>
            <CardContent>
            <Typography color="textSecondary" component="h5" variant="h5">
              Monthly Savings
            </Typography>
            <div className={classes.chartContainer}>
              <SimpleLineChart tableData={this.props.monthlyExpenses} monthlyAverage={this.props.monthlyAverage} />
            </div>
            </CardContent>
          </Card>
          
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