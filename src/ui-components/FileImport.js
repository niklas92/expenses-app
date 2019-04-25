import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CSVReader from 'react-csv-reader';

const styles = theme => ({ 
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
});

class FileImport extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

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
        </main>
    );
  }
}

export default withStyles(styles)(FileImport);