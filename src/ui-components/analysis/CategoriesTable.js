import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  averageRow: {
    backgroundColor: '#e0e0e0',
  }
};

function CategoriesTable(props) {
  const { classes, tableData } = props;

  return (
    <Paper>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">€</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map(n => (
            <TableRow key={n.category}>
              <TableCell component="th" scope="row">
                {n.category}
              </TableCell>
              <TableCell align="right">{n.amount}</TableCell>
            </TableRow>
          ))}
          <TableRow className={classes.averageRow} key="average">
              <TableCell component="th" scope="row">
                Average
              </TableCell>
              <TableCell align="right">100</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

CategoriesTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoriesTable);