import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';
import Cell from 'recharts/lib/component/Cell';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'

const data01 = [
  {
    "name": "Group A",
    "value": 400
  },
  {
    "name": "Group B",
    "value": 300
  },
  {
    "name": "Group C",
    "value": 300
  },
  {
    "name": "Group D",
    "value": 200
  },
  {
    "name": "Group E",
    "value": 278
  },
  {
    "name": "Group F",
    "value": 189
  }
];

const COLORS = ['#ffc107', '#009688', '#3f51b5', '#f44336', '#2196f3', '#cddc39', '#ff5722', '#00bcd4', '#673ab7', '#03a9f4'];

const styles = theme => ({ 
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  }
});

class ExpenseAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMonth: "8.2018"
    }
  }

  renderCustomizedLabel = ({index}) => this.props.classExp.get(this.state.selectedMonth).expenseGroups[index].name;

  handleMonthChange = event => {
    this.setState({ selectedMonth: event.target.value });
  };

  pieData = () => this.props.classExp.get(this.state.selectedMonth) ? this.props.classExp.get(this.state.selectedMonth).expenseGroups : [];

  createSelectMenu = () => {
    var menu = []

    for (const [key, val] of this.props.classExp.entries()) {
      menu.push(<MenuItem value={key}>{key}</MenuItem>);
    }
    return menu;
  }

  render() {
    const { classes } = this.props;

    return (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">Expense Classification</Typography>
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
          <PieChart width={730} height={500}>
            <Pie data={this.pieData()} dataKey="value" nameKey="name" cx="50%" cy="50%" fill="#82ca9d" label={this.renderCustomizedLabel}>
            {
            data01.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
            </Pie>
          </PieChart>
        </main>
    );
  }
}

export default withStyles(styles)(ExpenseAnalysis);