import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  tableContainer: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '4px',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    margin: '8px',
  },
  averageRow: {
    backgroundColor: '#e0e0e0',
  }
};

function CategoriesTable(props) {
  const { classes, tableData } = props;

  return (
    <div className={classes.tableContainer}>
      <Table>
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
    </div>
  );
}

CategoriesTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoriesTable);