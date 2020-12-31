import React, { useState } from 'react';

import { TextField } from '@material-ui/core';

export default function AddCourseForm(props) {
  return (
    <div>
      <TextField
        autoFocus
        margin="dense"
        label="Course Name"
        fullWidth
      />
      <TextField
        margin="dense"
        label="Course Name"
        fullWidth
      />
    </div>
  );
}