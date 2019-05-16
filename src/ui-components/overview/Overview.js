import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import OverviewBarChart from './OverviewBarChart.js';

const styles = theme => ({ 
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
        <div>
          <Typography color="textSecondary" variant="h4" gutterBottom component="h2">Overview</Typography>
          
          <Card>
            <CardContent>
            <Typography color="textSecondary" component="h5" variant="h5">
              Monthly Savings
            </Typography>
            <div className={classes.chartContainer}>
              <OverviewBarChart tableData={this.props.monthlyExpenses} monthlyAverage={this.props.monthlyAverage} />
            </div>
            </CardContent>
          </Card>
        </div>
    );
  }
}

export default withStyles(styles)(Overview);