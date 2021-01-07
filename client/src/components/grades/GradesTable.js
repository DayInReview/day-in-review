import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import AssignmentForm from './AssignmentForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function GradesTable(props) {
  const classes = useStyles;
  const [editRow, setEditRow] = useState(-1);

  const handleMoreClick = (e, assignment, index) => {
    props.setAnchorEl(e.target);
    props.setMenuType("assignment");
    props.setMenuTarget(assignment);
    setEditRow(index);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Assignment</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Completed</TableCell>
            <TableCell align="right">Grade</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.assignments ? props.assignments.map((assignment, index) => (
            props.assignmentEdit && editRow === index ?
            <AssignmentForm
              key={ index }
              current={ assignment }
              setAssignments={ props.setAssignments }
              type={ props.type }
              setAssignmentEdit={ props.setAssignmentEdit }
            />
            :
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                { assignment.name }
              </TableCell>
              <TableCell align="right">{ new Date(assignment.due_date).toLocaleDateString() }</TableCell>
              <TableCell align="right">{ assignment.completed ? <DoneIcon /> : null }</TableCell>
              <TableCell align="right">{ assignment.grade }</TableCell>
              <TableCell align="right">
                <IconButton onClick={(e) => {handleMoreClick(e, assignment, index)}}>
                  <MoreHorizIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )) : null}
          {/* Add Assignment Row */}
          <AssignmentForm
            setAssignments={ props.setAssignments }
            type={ props.type }
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}