import React, { useEffect, useState } from 'react';

import { TextField, InputAdornment, Input, FormControl, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GradesAPI from '../../pages/GradesAPI';

const useStyles = makeStyles((theme) => ({
  formControl: {
    paddingRight: theme.spacing(2),
  },
}));

export default function AssignmentTypeForm(props) {
  const classes = useStyles();
  const [assignmentType, setAssignmentType] = useState(props.current ? props.current.name : "");
  const [weight, setWeight] = useState(props.current ? props.current.weight*100 : 0.0);
  const [drops, setDrops] = useState(props.current ? props.current.drops : 0);

  const addAssignmentType = async () => {
    const newAssignmentType = await GradesAPI.createAssignmentType({
      name: assignmentType,
      weight: weight/100,
      drops: drops,
      course_id: props.course._id,
    });
    props.setAssignmentTypes((state) => ([
      ...state,
      newAssignmentType,
    ]));
  }

  const updateAssignmentType = async () => {
    const updatedAssignmentType = await GradesAPI.updateAssignmentType(props.current._id, {
      name: assignmentType,
      weight: weight/100,
      drops: drops,
      course_id: props.current.course_id,
    });
    props.setAssignmentTypes((state) => (state.map(type => (
      type._id === props.current._id ? updatedAssignmentType : type
    ))));
  }

  useEffect(() => {
    if (props.submitted) {
      if (props.current) {
        updateAssignmentType();
      } else {
        addAssignmentType();
      }
      props.setSubmitted(false);
    }
  }, [props.submitted]);

  return (
    <div>
      <TextField
        autoFocus
        value={assignmentType}
        margin="dense"
        label="Assignment Type"
        fullWidth
        onChange={(e) => {setAssignmentType(e.target.value)}}
      />
      <FormControl className={classes.formControl}>
        <Input
          label="Weight"
          value={weight}
          onChange={(e) => {setWeight(e.target.value)}}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
        />
        <FormHelperText>Weight</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <Input
          label="Drops"
          value={drops}
          onChange={(e) => {setDrops(e.target.value)}}
        />
        <FormHelperText>Drops</FormHelperText>
      </FormControl>
    </div>
  );
}