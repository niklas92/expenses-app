import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import OverviewBarChart from "./OverviewBarChart";
import CategoryPieChart from "../charts/CategoryPieChart";

const styles = theme => ({
  barChartContainer: {
    paddingTop: "16px",
    marginLeft: "-22px"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column"
  },
  tableContainer: {
    height: 320
  },
  cardContainer: {
    marginBottom: "18px;"
  },
  cardDivider: {
    minHeight: "30px"
  }
});

class Overview extends React.Component {
  render() {
    const { classes } = this.props;

    const pieChartData = this.props.categoryAverage.sort((a, b) => {
      return a.amount > b.amount ? -1 : 1;
    });

    return (
      <div>
        <Typography
          color="textSecondary"
          variant="h4"
          gutterBottom
          component="h2"
        >
          Overview
        </Typography>

        <Card className={classes.cardContainer}>
          <CardContent>
            <Typography color="textSecondary" component="h5" variant="h5">
              Monthly Savings
            </Typography>
            <div className={classes.barChartContainer}>
              <OverviewBarChart
                chartData={this.props.monthlyExpenses}
                monthlyAverage={this.props.monthlyAverage}
              />
            </div>
          </CardContent>
        </Card>

        <div className={classes.cardDivider} />

        <Card className={classes.cardContainer}>
          <CardContent className={classes.cardContent}>
            <Typography color="textSecondary" component="h5" variant="h5">
              Average Expenses
            </Typography>
            <CategoryPieChart chartData={pieChartData} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Overview);
