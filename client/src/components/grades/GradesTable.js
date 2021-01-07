import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Checkbox, Button } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import GradesAPI from '../../pages/GradesAPI';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function GradesTable(props) {
  const classes = useStyles;
  const [assignment, setAssignment] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [completed, setCompleted] = useState(false);
  const [grade, setGrade] = useState(null);

  const handleAddAssignment = async () => {
    const newAssignment = await GradesAPI.createAssignment({
      name: assignment,
      due_date: dueDate,
      completed: completed,
      grade: grade,
      type_id: props.type._id,
    });
    props.setAssignments((state) => ({
      ...state,
      [props.type.name]: [
        ...state[props.type.name],
        newAssignment,
      ],
    }));

    // Clear form
    setAssignment("");
    setDueDate(new Date());
    setCompleted(false);
    setGrade(null);
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
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                { assignment.name }
              </TableCell>
              <TableCell align="right">{ new Date(assignment.due_date).toLocaleDateString() }</TableCell>
              <TableCell align="right">{ assignment.completed ? <DoneIcon /> : null }</TableCell>
              <TableCell align="right">{ assignment.grade }</TableCell>
            </TableRow>
          )) : null}
          {/* Add Assignment Row */}
          <TableRow>
            <TableCell component="th" scope="row">
              <TextField
                margin="dense"
                label="Assignment Name"
                fullWidth
                size="small"
                onChange={(e) => {setAssignment(e.target.value)}}
              />
            </TableCell>
            <TableCell align="right">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="Due Date"
                  value={dueDate}
                  onChange={(date) => {setDueDate(date)}}
                />
              </MuiPickersUtilsProvider>
            </TableCell>
            <TableCell align="right">
              <Checkbox
                color="primary"
                checked={completed}
                onChange={(e) => {setCompleted(!completed)}}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                margin="dense"
                label="Grade"
                size="small"
                disabled={!completed}
                onChange={(e) => {setGrade(e.target.value)}}
              />
            </TableCell>
            <TableCell align="right">
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddAssignment}
              >
                Add
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}