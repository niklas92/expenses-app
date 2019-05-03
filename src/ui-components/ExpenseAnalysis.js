import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';
import Cell from 'recharts/lib/component/Cell';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';

const COLORS = ['#ffc107', '#009688', '#3f51b5', '#f44336', '#2196f3', '#cddc39', '#ff5722', '#00bcd4', '#673ab7', '#03a9f4'];

const styles = theme => ({ 
  appBarSpacer: theme.mixins.toolbar,
  mainContent: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  formControl: {
    width: '100px',
  }
});

class ExpenseAnalysis extends React.Component {
  constructor(props) {
    super(props);

    const currentSelection = 
      this.props.classExp.entries().next().value 
        ? this.props.classExp.entries().next().value[0] 
        : "";

    this.state = {
      selectedMonth: currentSelection
    }
  }

  renderCustomizedLabel = ({index}) => this.pieData()[index].category;

  handleMonthChange = event => {
    this.setState({ selectedMonth: event.target.value });
  };

  pieData = () => {
    const month = this.props.classExp.get(this.state.selectedMonth);
    return month ? month.expenseGroups.filter(e => e.amount > 0) : [];
  }

  createSelectMenu = () => {
    var menu = []

    for (const [k] of this.props.classExp.entries()) {
      menu.push(<MenuItem key={k} value={k}>{k}</MenuItem>);
    }
    return menu;
  }

  render() {
    const { classes } = this.props;

    return (
        <main className={classes.mainContent}>
          <div className={classes.appBarSpacer} />
          <Typography color="textSecondary" variant="h4" gutterBottom component="h2">Analysis</Typography>
          
          <Card>
            <CardContent className={classes.cardContent}>

              <div className={classes.cardHeader}>
                <Typography color="textSecondary" component="h5" variant="h5">
                  Expenses per Category
                </Typography>
                <form className={classes.root} autoComplete="off">
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="month">Month</InputLabel>
                    <Select
                      value={this.state.selectedMonth}
                      onChange={this.handleMonthChange}
                      inputProps={{
                        name: 'month',
                        id: 'month',
                      }}
                    >
                    {this.createSelectMenu()}
                    </Select>
                  </FormControl>
                </form>
              </div>      

              <ResponsiveContainer width="100%" height={350}>
                <PieChart margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <Pie data={this.pieData()} dataKey="amount" nameKey="category" minAngle={0} cx="50%" cy="50%" fill="#82ca9d" label={this.renderCustomizedLabel}>
                  {
                  this.pieData().map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                  }
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

            </CardContent>
          </Card>

        </main>
    );
  }
}

export default withStyles(styles)(ExpenseAnalysis);