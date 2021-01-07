import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import CourseForm from './CourseForm';
import AddAssignmentTypeForm from './AddAssignmentTypeForm';
import DeleteForm from './DeleteForm';

const useStyles = makeStyles((theme) => ({
  icon: {
    paddingRight: theme.spacing(2),
  },
}));

export default function MoreMenu(props) {
  const formTypes = {
    'add': {
      'semester': {
        content: 'Add a new course. Give a name, provide the grade cutoffs, and select the associated semester',
        form: <CourseForm setCourses={ props.setCourses } semesters={ props.semesters } />
      },
      'course': {
        content: 'Add a new assignment type. Give a name, the weight, and the number of allowed drops',
        form: <AddAssignmentTypeForm setAssignmentTypes={ props.setAssignmentTypes } course={ props.target } />
      },
      'assignment type': {
        content: 'Add a new assignment type. Give a name, the weight, and the number of allowed drops',
        form: <AddAssignmentTypeForm setAssignmentTypes={ props.setAssignmentTypes } course={ props.course } />
      },
    },
    'edit': {
      'semester': {
        content: 'Edit this semester',
        form: null,
      },
      'course': {
        content: 'Edit this course',
        form: <CourseForm setCourses={ props.setCourses } semesters={ props.semesters } current={ props.target } />
      }
    },
    'delete': {
      content: '',
      form: <DeleteForm type={ props.type } current={ props.target } semesters={ props.semesters } setSemesters={ props.setSemesters } setCourses={ props.setCourses } />,
    },
  }

  const classes = useStyles();

  const handleMenuClose = () => {
    props.setAnchorEl(null);
    props.setTarget(null);
  }

  const handleAdd = () => {
    props.setActionType('add');
    props.setDialogForm(formTypes['add'][props.type]);
    props.setMenuOpen(true);
  }

  const handleEdit = () => {
    props.setActionType('edit');
    props.setDialogForm(formTypes['edit'][props.type]);
    props.setMenuOpen(true);
  }

  const handleDelete = () => {
    props.setActionType('delete');
    props.setDialogForm(formTypes['delete']);
    props.setMenuOpen(true);
  }

  return (
    <Menu
      anchorEl={props.anchorEl}
      keepMounted
      open={Boolean(props.anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleAdd}>
        <AddIcon className={classes.icon} />
        Add
      </MenuItem>
      <MenuItem onClick={handleEdit}>
        <EditIcon className={classes.icon} />
        Edit
      </MenuItem>
      <MenuItem onClick={handleDelete}>
        <DeleteIcon className={classes.icon} />
        Delete
      </MenuItem>
    </Menu>
  );
}