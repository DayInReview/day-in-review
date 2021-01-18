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
import AddSemesterForm from '../components/grades/SemesterForm';
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
  grow: {
    flexGrow: 1,
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
  const [dropdownSemester, setDropdownSemester] = useState("");
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState({});
  const [course, setCourse] = useState(null);
  const [assignmentTypes, setAssignmentTypes] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [assignmentDates, setAssignmentDates] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState({});

  // UI States
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuType, setMenuType] = useState("");
  const [menuTarget, setMenuTarget] = useState(null);
  const [actionType, setActionType] = useState("");
  const [dialogForm, setDialogForm] = useState(null);
  const [assignmentEdit, setAssignmentEdit] = useState(false);

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

  const handleSemesterClick = async (s) => {
    setSemester(s);
    setCourse(null);
    const upcoming = await GradesAPI.getAllUpcomingAssignments(s);
    console.log(upcoming);
    setUpcomingAssignments(upcoming);
    setAssignmentDates(Object.keys(upcoming));
  }

  const handleSemesterDropdown = (name) => {
    if (name === dropdownSemester) {
      setDropdownSemester("");
    } else {
      setDropdownSemester(name);
    }
  }

  const handleAddSemester = () => {
    setActionType('add');
    setDialogForm(addSemesterForm);
    setMenuOpen(true);
  }

  const handleCourseSelect = async (course) => {
    setCourse(course);
    setSemester(null);
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
                selected={ s === semester }
                onClick={() => {handleSemesterClick(s)}}
              >
                <ListItemText primary={s.name} />
                <ListItemSecondaryAction className={classes.listItemSecondary}>
                  <IconButton onClick={(e) => {setAnchorEl(e.target); setMenuType("semester"); setMenuTarget(s)}}>
                    <MoreHorizIcon />
                  </IconButton>
                  <IconButton onClick={() => {handleSemesterDropdown(s.name)}}>
                    { dropdownSemester === s.name ? <ExpandLess /> : <ExpandMore /> }
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {/* List of courses for this semester */}
              <Collapse in={dropdownSemester === s.name} timeout="auto" unmountOnExit>
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
          semesters={semesters}
          setSemesters={setSemesters}
          setCourses={setCourses}
          assignmentTypes={assignmentTypes}
          setAssignmentTypes={setAssignmentTypes}
          setAssignments={setAssignments}
          setActionType={setActionType}
          setAssignmentEdit={setAssignmentEdit}
          course={course}
        />
      </Drawer>
      {/* Assignment Categories */}
      <main className={classes.content}>
        {/* Upcoming Assignments */}
        {semester && !course && assignmentDates.map((date, index) => (
          <div key={index}>
            <Toolbar>
              <Typography variant="h5" edge="start">{ new Date(date).toLocaleString('default', { month: 'long', day: 'numeric' }) }</Typography>
            </Toolbar>
            <GradesTable
              upcoming={ true }
              courses={ courses[semester.name] }
              assignments={ upcomingAssignments[date] }
            />
          </div>
        ))}
        {/* Assignment Tables */}
        {course && assignmentTypes.map((type, index) => (
          <div key={index}>
            <Toolbar>
              <Typography variant="h5" edge="start">{ type.name }</Typography>
              <div className={classes.grow} />
              <IconButton edge="end" onClick={(e) => {setAnchorEl(e.target); setMenuType("assignment type"); setMenuTarget(type)}}>
                <MoreHorizIcon />
              </IconButton>
            </Toolbar>
            <GradesTable
              type={ type }
              course={ course }
              assignments={ assignments[type.name] }
              setAssignments={ setAssignments }
              setAnchorEl={ setAnchorEl }
              setMenuType={ setMenuType }
              setMenuTarget={ setMenuTarget }
              assignmentEdit={ assignmentEdit }
              setAssignmentEdit={ setAssignmentEdit }
            />
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
