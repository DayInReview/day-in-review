import React, { useEffect, useState } from 'react';

import { TextField, FormControlLabel, Switch } from '@material-ui/core';

import GradesAPI from '../../pages/GradesAPI';

export default function SemesterForm(props) {
  const [semesterName, setSemesterName] = useState(props.current ? props.current.name : "");
  const [checkedCurrent, setCheckedCurrent] = useState(props.current ? props.current.current : false);

  const addSemester = async () => {
    const newSemester = await GradesAPI.createSemester({
      name: semesterName,
      current: checkedCurrent,
    });
    props.setSemesters((state) => ([
      ...state,
      newSemester,
    ]));
  }

  const updateSemester = async () => {
    const updatedSemester = await GradesAPI.updateSemester(props.current._id, {
      name: semesterName,
      current: checkedCurrent,
    });
    props.setSemesters((state) => (state.map(semester => (
      semester._id === props.current._id ? updatedSemester : semester
    ))));
  }

  useEffect(() => {
    if (props.submitted) {
      if (props.current) {
        updateSemester();
      } else {
        addSemester();
      }
      props.setSubmitted(false);
    }
  }, [props.submitted]);

  return (
    <div>
      <TextField
        autoFocus
        value={semesterName}
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