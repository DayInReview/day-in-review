import React, { useState, useEffect } from 'react';
import GradesAPI from './GradesAPI';

import { makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Fab, Drawer, List, ListSubheader, 
          ListItem, ListItemText, Toolbar, Collapse } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import AddSemesterForm from '../components/grades/AddSemesterForm';
import DialogForm from '../components/DialogForm';

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

const formTypes = {
  'semester': {
    content: 'Add a new semester. Give a name (e.g. Fall 2019) and denote if this is your current semester',
    form: 
      <AddSemesterForm />
  },
  'course': {
    content: 'Add a new course',
  },
  'assignment type': {
    content: 'Add a new assignment type',
  },
  'assignment': {
    content: 'Add a new assignment',
  }
}

export default function Grades(props) {
  // Data states
  const [semesters, setSemesters] = useState([]);
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState({});
  const [course, setCourse] = useState("");
  const [assignmentTypes, setAssignmentTypes] = useState({});
  const [assignmentType, setAssignmentType] = useState("");
  const [assignments, setAssignments] = useState({});
  const [assignment, setAssignment] = useState("");

  // UI States
  const [anchorEl, setAnchorEl] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addType, setAddType] = useState("");
  const [handleAdd, setHandleAdd] = useState({});

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
                      onClick={() => {setCourse(course.name)}}
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
        {/* Form Dialog */}
        <DialogForm
          title="Add New Item"
          content={ formTypes[addType] ? formTypes[addType].content : '' }
          form={ <AddSemesterForm setSemesters={ setSemesters } /> }
          open={ addOpen }
          setOpen={ setAddOpen }
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
          {!!assignmentType ? <MenuItem onClick={() => {setAddOpen(true); setAddType('assignment')}}>Assignment</MenuItem> : null}
          {!!course ? <MenuItem onClick={() => {setAddOpen(true); setAddType('assignment type')}}>Assignment Type</MenuItem> : null}
          <MenuItem onClick={() => {setAddOpen(true); setAddType('course')}}>Course</MenuItem>
          <MenuItem onClick={() => {setAddOpen(true); setAddType('semester')}}>Semester</MenuItem>
        </Menu>
      </main>
    </div>
  );
}
