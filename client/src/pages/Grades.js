import React, { useState, useEffect } from 'react';
import GradesAPI from './GradesAPI';

import { makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Fab, Drawer, List, ListSubheader, 
          ListItem, ListItemText, Toolbar, Collapse, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import DialogForm from '../components/DialogForm';
import AddSemesterForm from '../components/grades/AddSemesterForm';
import AddCourseForm from '../components/grades/AddCourseForm';
import AddAssignmentTypeForm from '../components/grades/AddAssignmentTypeForm';
import GradesTable from '../components/grades/GradesTable';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    textAlign: 'left',
  },
  drawerSubList: {
    paddingLeft: theme.spacing(4),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Grades(props) {
  // Data states
  const [semesters, setSemesters] = useState([]);
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState({});
  const [course, setCourse] = useState(null);
  const [assignmentTypes, setAssignmentTypes] = useState([]);
  const [assignmentType, setAssignmentType] = useState("");
  const [assignments, setAssignments] = useState({});
  const [assignment, setAssignment] = useState("");

  // UI States
  const [anchorEl, setAnchorEl] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState(null);

  const formTypes = {
    'semester': {
      content: 'Add a new semester. Give a name (e.g. Fall 2019) and denote if this is your current semester',
      form: <AddSemesterForm setSemesters={ setSemesters } />
    },
    'course': {
      content: 'Add a new course',
      form: <AddCourseForm setCourses={ setCourses } semesters={ semesters } />
    },
    'assignment type': {
      content: 'Add a new assignment type',
      form: <AddAssignmentTypeForm setAssignmentTypes={ setAssignmentTypes } course={ course } />
    },
    'assignment': {
      content: 'Add a new assignment',
    }
  }

  useEffect(() => {
    const fetchAndSetSemesters = async () => {
      const allSemesters = await GradesAPI.getAllSemesters();
      setSemesters(allSemesters);
    }
    fetchAndSetSemesters();
  }, []);

  useEffect(() => {
    const fetchAndSetCourses = async () => {
      let newCourses = {};
      for (const s of semesters) {
        const allCourses = await GradesAPI.getAllCourses(s);
        newCourses[s.name] = allCourses;
      }
      setCourses(newCourses);
    }
    fetchAndSetCourses();
  }, [semesters]);

  useEffect(() => {
    const fetchAndSetAssignments = async () => {
      let newAssignments = {};
      for (const type of assignmentTypes) {
        const allAssignments = await GradesAPI.getAllAssignments(type);
        newAssignments[type.name] = allAssignments;
      }
      setAssignments(newAssignments);
    }
    fetchAndSetAssignments();
  }, [assignmentTypes]);

  const handleSemesterClick = (name) => {
    if (name === semester) {
      setSemester("");
    } else {
      setSemester(name);
    }
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const handleCourseSelect = async (course) => {
    setCourse(course);
    const newAssignmentTypes = await GradesAPI.getAllAssignmentTypes(course);
    setAssignmentTypes(newAssignmentTypes);
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* Courses Sidebar */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <List className={classes.drawerContainer}
          component="nav"
          subheader={
            <ListSubheader component="div">
              Courses
            </ListSubheader>
          }
        >
          {semesters.map(({ name }, index) => (
            <div key={index}>
              <ListItem
                button
                onClick={() => {handleSemesterClick(name)}}
              >
                <ListItemText primary={name} />
                { semester === name ? <ExpandLess /> : <ExpandMore /> }
              </ListItem>
              {/* List of courses for this semester */}
              <Collapse in={semester === name} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {courses[name] && courses[name].map((course, index) => (
                    <ListItem
                      key={index}
                      button
                      className={classes.drawerSubList}
                      onClick={() => {handleCourseSelect(course)}}
                    >
                      <ListItemText primary={course.name} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </Drawer>
      {/* Assignment Categories */}
      <main className={classes.content}>
        <Toolbar />
        {/* Assignment Tables */}
        {assignmentTypes.map((type, index) => (
          <div key={index}>
            <Typography variant="h4" align="left">{ type.name }</Typography>
            <GradesTable assignments={ assignments[type.name] } />
            <Toolbar />
          </div>
        ))}
        {/* Form Dialog */}
        <DialogForm
          title="Add New Item"
          content={ addForm ? addForm.content : '' }
          form={ addForm ? addForm.form : null }
          open={ addOpen }
          setOpen={ setAddOpen }
          setAnchorEl={ setAnchorEl }
        />
        {/* Add button */}
        <Fab
          className={classes.fab}
          color="primary"
          onClick={(e) => {setAnchorEl(e.currentTarget)}}
        >
          <AddIcon />
        </Fab>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {!!assignmentType ? <MenuItem onClick={() => {setAddOpen(true); setAddForm(formTypes['assignment'])}}>Assignment</MenuItem> : null}
          {!!course ? <MenuItem onClick={() => {setAddOpen(true); setAddForm(formTypes['assignment type'])}}>Assignment Type</MenuItem> : null}
          <MenuItem onClick={() => {setAddOpen(true); setAddForm(formTypes['course'])}}>Course</MenuItem>
          <MenuItem onClick={() => {setAddOpen(true); setAddForm(formTypes['semester'])}}>Semester</MenuItem>
        </Menu>
      </main>
    </div>
  );
}
