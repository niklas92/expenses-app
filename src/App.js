import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NavigationMenu from "./ui-components/NavigationMenu.js";
import Overview from "./ui-components/overview/Overview.js";
import { Switch, Route } from "react-router-dom";
import FileImport from "./ui-components/FileImport.js";
import ExpenseAnalysis from "./ui-components/analysis/ExpenseAnalysis.js";
import { processData } from "./actions/parseCSV";
import { isBrowser } from "react-device-detect";

const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#82ca9d",
    },
    primary: {
      main: "#414a5c",
    },
  },
});

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9,
    },
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 6,
    height: `calc(100vh - 64px)`,
    marginTop: "64px",
    overflow: "auto",
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class App extends React.Component {
  state = {
    open: isBrowser,
    rawData: [],
    classifiedExpenses: new Map(),
    monthlyExpenses: [],
    categoryAverage: [],
    monAvgSavings: 0,
    monAvgExpenses: 0,
    uploadCaption: "No file",
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleFileLoaded = (data, fileInfo) => {
    const { classExp, monExp, monAvgSav, monAvgExp, catAvg } = processData(
      data
    );

    this.setState({
      rawData: data,
      classifiedExpenses: classExp,
      monthlyExpenses: monExp,
      categoryAverage: catAvg,
      monAvgSavings: monAvgSav,
      monAvgExpenses: monAvgExp,
      fileName: fileInfo.name,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar
            position="absolute"
            className={classNames(
              classes.appBar,
              this.state.open && classes.appBarShift
            )}
          >
            <Toolbar
              disableGutters={!this.state.open}
              className={classes.toolbar}
            >
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Expenses Checker
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              ),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <NavigationMenu />
          </Drawer>
          <main className={classes.content}>
            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <FileImport
                    fileName={this.state.fileName}
                    onFileLoaded={this.handleFileLoaded}
                  />
                )}
              ></Route>
              <Route
                path="/overview"
                component={() => (
                  <Overview
                    monthlyExpenses={this.state.monthlyExpenses}
                    monAvgSavings={this.state.monAvgSavings}
                    monAvgExpenses={this.state.monAvgExpenses}
                    categoryAverage={this.state.categoryAverage}
                  />
                )}
              ></Route>
              <Route
                path="/analysis"
                component={() => (
                  <ExpenseAnalysis classExp={this.state.classifiedExpenses} />
                )}
              ></Route>
            </Switch>
          </main>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
