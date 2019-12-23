import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShowChart from "@material-ui/icons/ShowChart";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import BarChartIcon from "@material-ui/icons/BarChart";
import { Link } from "react-router-dom";

const styles = {
  menuItem: {
    textDecoration: "none"
  }
};

function NavigationMenu(props) {
  const { classes } = props;

  return (
    <List>
      <Link className={classes.menuItem} to="/">
        <ListItem button>
          <ListItemIcon>
            <InsertDriveFile />
          </ListItemIcon>
          <ListItemText primary="CSV Import" />
        </ListItem>
      </Link>
      <Link className={classes.menuItem} to="/overview">
        <ListItem button>
          <ListItemIcon>
            <ShowChart />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>
      </Link>
      <Link className={classes.menuItem} to="/analysis">
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Analysis" />
        </ListItem>
      </Link>
    </List>
  );
}

NavigationMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavigationMenu);
