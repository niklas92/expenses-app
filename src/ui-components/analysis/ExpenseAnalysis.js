import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import CategoriesPieChart from './CategoriesPieChart';
import CategoriesBarChart from './CategoriesBarChart';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';

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
    margin: theme.spacing.unit,
    minWidth: 120,
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
      selectedMonth: currentSelection,
      isPieChart: true,
      labelWidth: 0
    }
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }


  handleMonthChange = event => {
    this.setState({ selectedMonth: event.target.value });
  };

  handleChartTypeChange = event => {
    this.setState({ isPieChart: event.target.value });
  };

  chartData = () => {
    const month = this.props.classExp.get(this.state.selectedMonth);
    return month ? month.expenseGroups : [];
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
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel 
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="type">Type</InputLabel>
                    <Select
                      value={this.state.isPieChart}
                      onChange={this.handleChartTypeChange}
                      input={<OutlinedInput labelWidth={this.state.labelWidth} name="type" id="type" />}
                    >
                      <MenuItem key='pie' value={true}>Pie Chart</MenuItem>
                      <MenuItem key='bar' value={false}>Bar Chart</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel 
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="month">Month</InputLabel>
                    <Select
                      value={this.state.selectedMonth}
                      onChange={this.handleMonthChange}
                      input={<OutlinedInput labelWidth={this.state.labelWidth} name="month" id="month" />}
                    >
                    {this.createSelectMenu()}
                    </Select>
                  </FormControl>
                </form>
              </div>      

              {this.state.isPieChart
                ? <CategoriesPieChart chartData={this.chartData()}/>
                : <CategoriesBarChart chartData={this.chartData()}/>}
            </CardContent>
          </Card>

        </main>
    );
  }
}

export default withStyles(styles)(ExpenseAnalysis);