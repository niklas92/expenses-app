import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CSVReader from "react-csv-reader";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircle from "@material-ui/icons/CheckCircle";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import bankMap from "../actions/bankFormat";

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
  cardBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  uploadStatus: {
    color: "rgba(0, 0, 0, 0.54)",
    margin: "40px 0",
  },
  uploadStatusLine: {
    display: "flex",
    padding: "8px 0",
  },
  uploadStatusText: { alignSelf: "center", paddingLeft: "7px" },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class FileImport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelWidthBank: 0,
    };
  }

  componentDidMount() {
    this.setState({
      labelWidthBank: ReactDOM.findDOMNode(this.InputLabelRefBank).offsetWidth,
    });
  }

  createSelectMenuBank = () => {
    const menu = [];

    for (const [k] of bankMap.entries()) {
      menu.push(
        <MenuItem key={k} value={k}>
          {k}
        </MenuItem>
      );
    }
    return menu;
  };

  render() {
    const { classes, fileName } = this.props;

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
          CSV Import
        </Typography>

        <Card className={classes.cardContainer}>
          <CardContent>
            <div className={classes.cardHeader}>
              <Typography color="textSecondary" component="h5" variant="h5">
                Please upload your Bank statement in CSV format
              </Typography>
              <form className={classes.root} autoComplete="off">
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    ref={(ref) => {
                      this.InputLabelRefBank = ref;
                    }}
                    htmlFor="bank"
                  >
                    Bank
                  </InputLabel>
                  <Select
                    value={this.props.selectedBank}
                    onChange={this.props.onBankChange}
                    input={
                      <OutlinedInput
                        labelWidth={this.state.labelWidthBank}
                        name="bank"
                        id="bank"
                      />
                    }
                  >
                    {this.createSelectMenuBank()}
                  </Select>
                </FormControl>
              </form>
            </div>

            <div className={classes.cardBody}>
              {fileName ? (
                <div className={classes.uploadStatus}>
                  <div className={classes.uploadStatusLine}>
                    <CheckCircle />
                    <div className={classes.uploadStatusText}>
                      Import successfull
                    </div>
                  </div>
                  <div className={classes.uploadStatusLine}>
                    <InsertDriveFile />
                    <div className={classes.uploadStatusText}>{fileName}</div>
                  </div>
                </div>
              ) : (
                <div className={classes.uploadStatus}>
                  <div className={classes.uploadStatusLine}>
                    <CancelIcon />
                    <div className={classes.uploadStatusText}>
                      No file provided
                    </div>
                  </div>
                  <div className={classes.uploadStatusLine}>
                    <InsertDriveFile />
                    <div className={classes.uploadStatusText}>unkown</div>
                  </div>
                </div>
              )}
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
          </CardContent>
        </Card>
      </div>
    );
  }
}

FileImport.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileImport);
