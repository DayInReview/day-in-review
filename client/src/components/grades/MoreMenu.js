import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import CourseForm from './CourseForm';
import SemesterForm from './SemesterForm';
import AssignmentTypeForm from './AssignmentTypeForm';
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
        form: <CourseForm
                setCourses={ props.setCourses }
                semesters={ props.semesters } 
              />
      },
      'course': {
        content: 'Add a new assignment type. Give a name, the weight, and the number of allowed drops',
        form: <AssignmentTypeForm
                setAssignmentTypes={ props.setAssignmentTypes }
                course={ props.target }
              />
      },
    },
    'edit': {
      'semester': {
        content: 'Edit this semester',
        form: <SemesterForm
                setSemesters={ props.setSemesters }
                current={ props.target }
              />
      },
      'course': {
        content: 'Edit this course',
        form: <CourseForm
                setCourses={ props.setCourses }
                semesters={ props.semesters }
                current={ props.target }
              />
      },
      'assignment type': {
        content: 'Edit this assignment type',
        form: <AssignmentTypeForm
                setAssignmentTypes={ props.setAssignmentTypes }
                current={ props.target }
              />
      }
    },
    'delete': {
      content: '',
      form: <DeleteForm 
              type={ props.type }
              current={ props.target }
              semesters={ props.semesters }
              setSemesters={ props.setSemesters }
              setCourses={ props.setCourses }
              assignmentTypes={ props.assignmentTypes }
              setAssignmentTypes={ props.setAssignmentTypes }
              setAssignments={ props.setAssignments }
            />,
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
      {(props.type !== 'assignment type' && props.type !== 'assignment') && <MenuItem onClick={handleAdd}>
        <AddIcon className={classes.icon} />
        Add
      </MenuItem>}
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