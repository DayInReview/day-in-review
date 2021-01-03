import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function GradesTable(props) {
  const classes = useStyles;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Assignment</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Completed</TableCell>
            <TableCell align="right">Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.assignments ? props.assignments.map((assignment, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                { assignment.name }
              </TableCell>
              <TableCell align="right">--</TableCell>
              <TableCell align="right">--</TableCell>
              <TableCell align="right">{ assignment.grade }</TableCell>
            </TableRow>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}