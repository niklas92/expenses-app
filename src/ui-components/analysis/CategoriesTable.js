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

  const tableEntries = tableData ? tableData.entries : [];
  const totalAmount = tableData ? tableData.amount : [];

  return (
    <div className={classes.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Reference</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableEntries.map((entry, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {entry.date.format("DD.MM.YYYY")}
              </TableCell>
              <TableCell component="th" scope="row">
                {entry.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {entry.reference}
              </TableCell>
              <TableCell align="right">{entry.amount} €</TableCell>
            </TableRow>
          ))}
          <TableRow className={classes.averageRow} key="average">
              <TableCell component="th" scope="row">
                Total
              </TableCell>
              <TableCell/>
              <TableCell/>
              <TableCell align="right">-{totalAmount} €</TableCell>
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