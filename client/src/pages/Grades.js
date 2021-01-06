import React, { useState, useEffect } from 'react';
import GradesAPI from './GradesAPI';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListSubheader, 
          ListItem, ListItemText, ListItemSecondaryAction, Toolbar, 
          Collapse, Typography, IconButton } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import DialogForm from '../components/DialogForm';
import AddSemesterForm from '../components/grades/AddSemesterForm';
import AddCourseForm from '../components/grades/AddCourseForm';
import AddAssignmentTypeForm from '../components/grades/AddAssignmentTypeForm';
import GradesTable from '../components/grades/GradesTable';
import MoreMenu from '../components/grades/MoreMenu';

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
  listItemSecondary: {
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fab: {
    position: 'fixed',
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
  const [assignments, setAssignments] = useState({});

  // UI States
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogForm, setDialogForm] = useState(null);

  const formTypes = {
    'semester': {
      content: 'Add a new semester. Give a name (e.g. Fall 2019) and denote if this is your current semester',
      form: <AddSemesterForm setSemesters={ setSemesters } />
    },
    'course': {
      content: 'Add a new course. Give a name, provide the grade cutoffs, and select the associated semester',
      form: <AddCourseForm setCourses={ setCourses } semesters={ semesters } />
    },
    'assignment type': {
      content: 'Add a new assignment type. Give a name, the weight, and the number of allowed drops',
      form: <AddAssignmentTypeForm setAssignmentTypes={ setAssignmentTypes } course={ course } />
    },
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
              >
                <ListItemText primary={name} />
                <ListItemSecondaryAction className={classes.listItemSecondary}>
                  <IconButton onClick={(e) => {setAnchorEl(e.target)}}>
                    <MoreHorizIcon />
                  </IconButton>
                  <IconButton onClick={() => {handleSemesterClick(name)}}>
                    { semester === name ? <ExpandLess /> : <ExpandMore /> }
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {/* List of courses for this semester */}
              <Collapse in={semester === name} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {courses[name] && courses[name].map((c, index) => (
                    <ListItem
                      key={index}
                      button
                      selected={ c === course }
                      className={classes.drawerSubList}
                      onClick={() => {handleCourseSelect(c)}}
                    >
                      <ListItemText primary={c.name} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={(e) => {setAnchorEl(e.target)}}>
                          <MoreHorizIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
        {/* Edit Menu */}
        <MoreMenu 
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          setMenuOpen={setMenuOpen}
        />
      </Drawer>
      {/* Assignment Categories */}
      <main className={classes.content}>
        {/* Assignment Tables */}
        {assignmentTypes.map((type, index) => (
          <div key={index}>
            <Typography variant="h5" align="left">{ type.name }</Typography>
            <GradesTable assignments={ assignments[type.name] } type={ type } setAssignments={ setAssignments } />
            <Toolbar />
          </div>
        ))}
        {/* Form Dialog */}
        <DialogForm
          title="Add New Item"
          content={ dialogForm ? dialogForm.content : '' }
          form={ dialogForm ? dialogForm.form : null }
          open={ menuOpen }
          setOpen={ setMenuOpen }
          setAnchorEl={ setAnchorEl }
        />
      </main>
    </div>
  );
}
