import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CSVReader from 'react-csv-reader';

const styles = theme => ({
});

class FileImport extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    const handleForce = data => {
        this.props.onFileLoaded(data);
    }

    return (
        <div>
          <CSVReader
            label="Select Expenses CSV"
            onFileLoaded={handleForce}
          />
        </div>
    );
  }
}

FileImport.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(FileImport);