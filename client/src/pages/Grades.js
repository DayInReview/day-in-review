import React, { useState, useEffect } from 'react';
import GradesAPI from './GradesAPI';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListSubheader, ListItem, ListItemText, Toolbar, Collapse } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
}));

export default function Grades(props) {
  const [semesters, setSemesters] = useState([]);
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState({});
  const [course, setCourse] = useState("");
  const [assignmentTypes, setAssignmentTypes] = useState({});
  const [assignments, setAssignments] = useState({});

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
                    <ListItem key={index} button className={classes.drawerSubList}>
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
      
    </div>
  );
}
