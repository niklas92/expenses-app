import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import OverviewBarChart from "./OverviewBarChart";
import CategoryPieChart from "../charts/CategoryPieChart";

const styles = (theme) => ({
  barChartContainer: {
    paddingTop: "16px",
    marginLeft: "-22px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
  tableContainer: {
    height: 320,
  },
  cardContainer: {
    marginBottom: "18px",
  },
  cardContainerSideBar: {
    marginBottom: "18px",
    display: "flex",
    justifyContent: "stretch",
  },
  cardDivider: {
    minHeight: "30px",
  },
  cardContentPrimary: { flexGrow: 1 },
  cardContentSecondary: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  kpiContainer: {
    margin: "48px 15px",
  },
  kpiAmount: {
    color: theme.palette.secondary.main,
    fontSize: "30px",
    fontWeight: "bold",
  },
  kpiLegend: {
    color: "rgba(0, 0, 0, 0.45)",
    fontSize: "12px",
  },
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

        <Card className={classes.cardContainerSideBar}>
          <CardContent className={classes.cardContentPrimary}>
            <Typography color="textSecondary" component="h5" variant="h5">
              Monthly Savings
            </Typography>
            <div className={classes.barChartContainer}>
              <OverviewBarChart
                chartData={this.props.monthlyExpenses}
                monAvgSavings={this.props.monAvgSavings}
              />
            </div>
          </CardContent>
          <CardContent className={classes.cardContentSecondary}>
            <div className={classes.kpiContainer}>
              <div className={classes.kpiAmount}>
                {this.props.monAvgExpenses} €
              </div>
              <div className={classes.kpiLegend}>AVERAGE EXPENSES</div>
            </div>
            <div className={classes.kpiContainer}>
              <div className={classes.kpiAmount}>
                {this.props.monAvgSavings} €
              </div>
              {this.props.monAvgSavings >= 0 ? (
                <div className={classes.kpiLegend}>AVERAGE SAVINGS</div>
              ) : (
                <div className={classes.kpiLegend}>AVERAGE OVERDRAFT</div>
              )}
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
