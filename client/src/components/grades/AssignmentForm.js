import React, { useState } from 'react';

import { TableRow, TableCell, TextField, Checkbox, Button } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import GradesAPI from '../../pages/GradesAPI';

export default function AssignmentForm(props) {
  const [assignment, setAssignment] = useState(props.current ? props.current.name : "");
  const [dueDate, setDueDate] = useState(props.current ? new Date(props.current.due_date) : new Date());
  const [completed, setCompleted] = useState(props.current ? props.current.completed : false);
  const [grade, setGrade] = useState(props.current ? props.current.grade : '');

  const addAssignment = async () => {
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

  const updateAssignment = async () => {
    const updatedAssignment = await GradesAPI.updateAssignment(props.current._id, {
      name: assignment,
      due_date: dueDate,
      completed: completed,
      grade: grade,
      type_id: props.type._id,
    });
    props.setAssignments((state) => ({
      ...state,
      [props.type.name]: state[props.type.name].map(assignment => (
        assignment._id === props.current._id ? updatedAssignment : assignment
      ))
    }));
    props.setAssignmentEdit(false);
  }

  const handleSubmit = async () => {
    if (props.current) {
      updateAssignment();
    } else {
      addAssignment();
    }
  }

  return  (
    <TableRow>
      <TableCell component="th" scope="row">
        <TextField
          margin="dense"
          value={assignment}
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
          value={grade || ''}
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
          onClick={handleSubmit}
        >
          {props.current ? "Update" : "Add"}
        </Button>
      </TableCell>
    </TableRow>
  );
}