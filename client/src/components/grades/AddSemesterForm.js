import React, { useEffect, useState } from 'react';

import { TextField, FormControlLabel, Switch } from '@material-ui/core';

export default function AddSemesterForm(props) {
  const [semesterName, setSemesterName] = useState("");
  const [checkedCurrent, setCheckedCurrent] = useState(false);

  useEffect(() => {
    props.setHandleSubmit({
      handler: () => {
        alert('Adding semester...');
      }
    });
  }, []);

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