import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CSVReader from "react-csv-reader";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  csvReader: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "4px",
    borderColor: "rgba(0, 0, 0, 0.23)",
    margin: "8px",
  },
  csvInput: {
    backgroundColor: "#82ca9d",
    minWidth: "100px",
    minHight: "100px",
  },
});

class FileImport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, uploadCaption } = this.props;

    const handleForce = (data, fileInfo) => {
      this.props.onFileLoaded(data, fileInfo);
    };

    const parseOptions = {
      header: false,
      dynamicTyping: false,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
    };

    return (
      <div>
        <Typography
          color="textSecondary"
          variant="h4"
          gutterBottom
          component="h2"
        >
          File Import
        </Typography>
        <div>{uploadCaption}</div>
        <CSVReader
          label={""}
          onFileLoaded={handleForce}
          inputStyle={{ display: "none" }}
          parserOptions={parseOptions}
          inputId="raised-button-file"
        />
        <label htmlFor="raised-button-file">
          <Button
            color="secondary"
            variant="contained"
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileImport);
