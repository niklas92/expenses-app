import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({ 
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
});

class ExpenseAnalysis extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div>Expense classification</div>
        </main>
    );
  }
}

export default withStyles(styles)(ExpenseAnalysis);