import React from 'react';

import { Typography } from '@material-ui/core';

import GradesAPI from '../../pages/GradesAPI';

export default function DeleteForm(props) {

  const deleteSemester = () => {

  }

  const deleteCourse = () => {

  }

  const deleteAssignmentType = () => {

  }

  return (
    <Typography variant="body1">
      Are you sure you want to delete { props.current.name }?
    </Typography>
  );
}