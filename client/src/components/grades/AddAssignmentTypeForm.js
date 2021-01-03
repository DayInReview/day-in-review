import React, { useEffect, useState } from 'react';

import { TextField, InputAdornment, Input, FormControl, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GradesAPI from '../../pages/GradesAPI';

const useStyles = makeStyles((theme) => ({
  formControl: {
    paddingRight: theme.spacing(2),
  },
}));

export default function AddAssignmentTypeForm(props) {
  const classes = useStyles();
  const [assignmentType, setAssignmentType] = useState("");
  const [weight, setWeight] = useState(0.0);
  const [drops, setDrops] = useState(0);

  const addAssignmentType = async () => {
    const newAssignmentType = await GradesAPI.createAssignmentType({
      name: assignmentType,
      weight: weight/100,
      drops: drops,
      course_id: props.course._id,
    });
    props.setAssignmentTypes((state, props) => ([
      ...state,
      newAssignmentType,
    ]));
  }

  useEffect(() => {
    if (props.submitted) {
      addAssignmentType();
      props.setSubmitted(false);
    }
  }, [props.submitted]);

  return (
    <div>
      <TextField
        autoFocus
        margin="dense"
        label="Assignment Type"
        fullWidth
        onChange={(e) => {setAssignmentType(e.target.value)}}
      />
      <FormControl className={classes.formControl}>
        <Input
          label="Weight"
          onChange={(e) => {setWeight(e.target.value)}}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
        />
        <FormHelperText>Weight</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <Input
          value={drops}
          label="Drops"
          onChange={(e) => {setDrops(e.target.value)}}
        />
        <FormHelperText>Drops</FormHelperText>
      </FormControl>
    </div>
  );
}