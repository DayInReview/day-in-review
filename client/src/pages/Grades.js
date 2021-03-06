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
  const [gpa, setGPA] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const [dropdownSemester, setDropdownSemester] = useState("");
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState({});
  const [course, setCourse] = useState(null);
  const [gradeCalc, setGradeCalc] = useState(false);
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
    if (!gradeCalc)
      fetchAndSetCourses();
    setGradeCalc(false);
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
    if (!gradeCalc)
      fetchAndSetAssignments();
    setGradeCalc(false);
  }, [assignmentTypes]);

  const handleSemesterClick = async (s) => {
    setSemester(s);
    setCourse(null);
    const upcoming = await GradesAPI.getAllUpcomingAssignments(s);
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
  // Update grade calculations
  useEffect(() => {
    const calculateAssignmentTypeGrades = async () => {
      let newAssignmentTypes = [];
      for (const assignmentType of assignmentTypes) {
        const updatedAssignmentType = await GradesAPI.calculateAssignmentTypeGrade(assignmentType._id);
        newAssignmentTypes.push(updatedAssignmentType);
      }
      setGradeCalc(true);
      setAssignmentTypes(newAssignmentTypes);
    }
    calculateAssignmentTypeGrades();
  }, [assignments]);

  useEffect(() => {
    const calculateCourseGrades = async () => {
      const updatedCourse = await GradesAPI.calculateCourseGrade(course._id);
      const courseSemester = semesters.find(s => (s._id === updatedCourse.semester_id)).name;
      setCourse(updatedCourse);
      setCourses((state) => ({
        ...state,
        [courseSemester]: state[courseSemester] ? state[courseSemester].map((c) => (
          c._id === updatedCourse._id ? updatedCourse : c
        )) : null,
      }));
    }
    if (course)
      calculateCourseGrades();
  }, [assignmentTypes]);
  
  useEffect(() => {
    const calculateSemesterGrades = async () => {
      let newSemesters = [];
      for (const semester of semesters) {
        const updatedSemester = await GradesAPI.calculateSemesterGrade(semester._id);
        newSemesters.push(updatedSemester);
      }
      setGradeCalc(true);
      setSemesters(newSemesters);
    }
    calculateSemesterGrades();
  }, [courses]);

  useEffect(() => {
    const calculateGPA = async () => {
      const gpa = await GradesAPI.calculateGPA();
      setGPA(gpa);
    }
    calculateGPA();
  }, [semesters]);

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

  const getLetterGrade = (course) => {
    for (const letter of Object.keys(course.cutoffs)) {
      if (course.grade >= course.cutoffs[letter]) {
        return letter;
      }
    }
    return 'F';
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
                <ListItemText primary={s.name} secondary={s.gpa ? s.gpa.toFixed(2) : ''} />
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
                      <ListItemText primary={c.name} secondary={c.grade ? c.grade.toFixed(2) : ''} />
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
          <ListItem>
            <ListItemText primary={gpa ? "GPA: " + gpa.toFixed(2) : ''} />
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
        <Toolbar>
          {course ? <Typography variant="h4">{ course.name } ({ course.grade !== null ? course.grade.toFixed(2) + " - " + getLetterGrade(course) : 'N/A' })</Typography> : null }
        </Toolbar>
        {/* Assignment Tables */}
        {course && assignmentTypes.map((type, index) => (
          <div key={index}>
            <Toolbar>
              <Typography variant="h5" edge="start">{ type.name } ({ type.grade !== null ? type.grade.toFixed(2) : 'N/A' })</Typography>
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
