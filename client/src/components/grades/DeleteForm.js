import React, { useEffect } from 'react';

import { Typography } from '@material-ui/core';

import GradesAPI from '../../pages/GradesAPI';

export default function DeleteForm(props) {

  const deleteSemester = async () => {

  }

  const deleteCourse = async () => {
    await GradesAPI.deleteCourse(props.current._id);
    const semester = props.semesters.find(s => s._id === props.current.semester_id);
    props.setCourses((state) => ({
      ...state,
      [semester.name]: state[semester.name].filter(course => (
        course._id !== props.current._id
      )),
    }));
  }

  const deleteAssignmentType = async () => {

  }

  useEffect(() => {
    if (props.submitted) {
      switch (props.type) {
        case 'course':
          deleteCourse();
          break;
        case 'assignment type':
          break;
        case 'assignment':
          break;
        default:
          break;
      }
      props.setSubmitted(false);
    }
  }, [props.submitted]);

  

  return (
    <Typography variant="body1">
      Are you sure you want to delete { props.current.name }?
    </Typography>
  );
}