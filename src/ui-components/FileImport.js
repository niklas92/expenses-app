import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CSVReader from "react-csv-reader";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  csvReader: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "4px",
    borderColor: "rgba(0, 0, 0, 0.23)",
    margin: "8px"
  },
  csvInput: {
    backgroundColor: "#82ca9d",
    minWidth: "100px",
    minHight: "100px"
  }
});

class FileImport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    const handleForce = data => {
      this.props.onFileLoaded(data);
    };

    return (
      <div>
        <CSVReader
          label="Select Expenses CSV"
          onFileLoaded={handleForce}
          inputStyle={{ display: "none" }}
          inputId="raised-button-file"
        />
        <label htmlFor="raised-button-file">
          <Button
            color="secondary"
            variant="raised"
            component="span"
            className={classes.button}
          >
            Upload
          </Button>
        </label>
      </div>
    );
  }
}

FileImport.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FileImport);
