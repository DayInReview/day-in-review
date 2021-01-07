import React, { useState, useEffect } from 'react';
import GradesAPI from './GradesAPI';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListSubheader, 
          ListItem, ListItemText, ListItemSecondaryAction, Toolbar, 
          Collapse, Typography, IconButton } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';

import DialogForm from '../components/DialogForm';
import GradesTable from '../components/grades/GradesTable';
import AddSemesterForm from '../components/grades/AddSemesterForm';
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
  addSemester: {
    paddingRight: theme.spacing(2),
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
  const [menuType, setMenuType] = useState("");
  const [menuTarget, setMenuTarget] = useState(null);
  const [actionType, setActionType] = useState("");
  const [dialogForm, setDialogForm] = useState(null);

  const addSemesterForm = {
    content: 'Add a new semester. Give a name (e.g. Fall 2019) and denote if this is your current semester',
    form: <AddSemesterForm setSemesters={ setSemesters } />
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

  const handleAddSemester = () => {
    setActionType('add');
    setDialogForm(addSemesterForm);
    setMenuOpen(true);
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
          {semesters.map((s, index) => (
            <div key={index}>
              <ListItem
                button
              >
                <ListItemText primary={s.name} />
                <ListItemSecondaryAction className={classes.listItemSecondary}>
                  <IconButton onClick={(e) => {setAnchorEl(e.target); setMenuType("semester"); setMenuTarget(s)}}>
                    <MoreHorizIcon />
                  </IconButton>
                  <IconButton onClick={() => {handleSemesterClick(s.name)}}>
                    { semester === s.name ? <ExpandLess /> : <ExpandMore /> }
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {/* List of courses for this semester */}
              <Collapse in={semester === s.name} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {courses[s.name] && courses[s.name].map((c, index) => (
                    <ListItem
                      key={index}
                      button
                      selected={ c === course }
                      className={classes.drawerSubList}
                      onClick={() => {handleCourseSelect(c)}}
                    >
                      <ListItemText primary={c.name} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={(e) => {setAnchorEl(e.target); setMenuType("course"); setMenuTarget(c)}}>
                          <MoreHorizIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
          <ListItem
            button
            onClick={handleAddSemester}
          >
            <AddIcon className={classes.addSemester} />
            <ListItemText primary="Add New Semester" />
          </ListItem>
        </List>
        {/* Edit Menu */}
        <MoreMenu
          target={menuTarget}
          type={menuType}
          setTarget={setMenuTarget}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          setMenuOpen={setMenuOpen}
          setDialogForm={setDialogForm}
          setSemesters={setSemesters}
          setCourses={setCourses}
          setAssignmentTypes={setAssignmentTypes}
          setActionType={setActionType}
          semesters={semesters}
          course={course}
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
          type={ menuType }
          actionType={ actionType }
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
