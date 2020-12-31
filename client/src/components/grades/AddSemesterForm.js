import React, { useEffect, useState } from 'react';

import { TextField, FormControlLabel, Switch } from '@material-ui/core';

import GradesAPI from '../../pages/GradesAPI';

export default function AddSemesterForm(props) {
  const [semesterName, setSemesterName] = useState("");
  const [checkedCurrent, setCheckedCurrent] = useState(false);

  useEffect(() => {
    if (props.submitted) {
      addSemester();
      props.setSubmitted(false);
    }
  }, [props.submitted]);

  const addSemester = async () => {
    const newSemester = await GradesAPI.createSemester({
      name: semesterName,
      current: checkedCurrent,
    });
    props.setSemesters((state, props) => ([
      ...state,
      newSemester,
    ]));
  }

  return (
    <div>
      <TextField
        autoFocus
        margin="dense"
        label="Semester Name"
        fullWidth
        onChange={({ target }) => {setSemesterName(target.value)}}
      />
      <FormControlLabel
          control={
            <Switch
              checked={checkedCurrent}
              onChange={() => {setCheckedCurrent(!checkedCurrent)}}
              color="primary"
            />
          }
          label="Current"
        />
    </div>
  );
}