import React, { useEffect, useState } from 'react';

import { Typography, Slider, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GradesAPI from '../../pages/GradesAPI';

const defaultCutoffs = {
  'A+': 92.5,
  'A-': 89.5,
  'B+': 86.5,
  'B': 82.5,
  'B-': 79.5,
  'C+': 76.5,
  'C': 72.5,
  'C-': 69.5,
  'D+': 66.5,
  'D': 62.5,
  'D-': 59.5
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 500,
  },
  formControl: {
    minWidth: 120,
  },
}));


const marks = [
  { value: 50, label: '50' },
  { value: 60, label: '60' },
  { value: 70, label: '70' },
  { value: 80, label: '80' },
  { value: 90, label: '90' },
  { value: 100, label: '100' },
];


export default function CourseForm(props) {
  const classes = useStyles();
  const [courseName, setCourseName] = useState(props.current ? props.current.name : "");
  const [courseSemester, setCourseSemester] = useState({});
  const [cutoffs, setCutoffs] = useState(props.current ? Object.values(props.current.cutoffs) : Object.values(defaultCutoffs));

  const addCourse = async () => {
    var newCutoffs = {};
    Object.getOwnPropertyNames(defaultCutoffs).forEach((key, i) => newCutoffs[key] = cutoffs[i]);
    const newCourse = await GradesAPI.createCourse({
      name: courseName,
      cutoffs: newCutoffs,
      semester_id: courseSemester._id,
    });
    props.setCourses((state) => ({
      ...state,
      [courseSemester.name]: [
        ...state[courseSemester.name],
        newCourse,
      ],
    }));
  }
  
  const updateCourse = async () => {
    var newCutoffs = {};
    Object.getOwnPropertyNames(defaultCutoffs).forEach((key, i) => newCutoffs[key] = cutoffs[i]);
    const updatedCourse = await GradesAPI.updateCourse(props.current._id, {
      name: courseName,
      cutoffs: newCutoffs,
      semester_id: courseSemester._id,
    });
    if (props.current.semester_id === courseSemester._id) { // Semester didn't change
      props.setCourses((state) => ({
        ...state,
        [courseSemester.name]: state[courseSemester.name].map(course => (
          course._id === props.current._id ? updatedCourse : course
        )),
      }));
    } else {  // Semester did change
      var oldSemester;
      for (const s of props.semesters) {
        if (s._id === props.current.semester_id) {
          oldSemester = s;
        }
      }
      props.setCourses((state) => ({
        ...state,
        [courseSemester.name]: [
          ...state[courseSemester.name],
          updatedCourse,
        ],
        [oldSemester.name]: state[oldSemester.name].filter(course => (
          course._id !== props.current._id
        )),
      }));
    }
  }

  useEffect(() => {
    if (props.current) {
      for (const s of props.semesters) {
        if (s._id === props.current.semester_id) {
          setCourseSemester(s);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (props.submitted) {
      if (props.current) {
        updateCourse();
      } else {
        addCourse();
      }
      props.setSubmitted(false);
    }
  }, [props.submitted]);

  const handleCutoffsChange = (e, newValue) => {
    setCutoffs(newValue);
  }

  const handleSemesterChange = (e) => {
    setCourseSemester(e.target.value);
  }

  return (
    <div className={classes.root}>
      <TextField
        autoFocus
        margin="dense"
        label="Course Name"
        fullWidth
        value={courseName}
        onChange={(e) => {setCourseName(e.target.value)}}
      />
      <Typography gutterBottom>
        Grade Cutoffs
      </Typography>
      <Slider
        track={false}
        valueLabelDisplay="auto"
        min={50}
        max={100}
        step={.5}
        defaultValue={cutoffs}
        marks={marks}
        onChange={handleCutoffsChange}
      />
      <FormControl className={classes.formControl}>
        <InputLabel>Semester</InputLabel>
        <Select
          value={courseSemester}
          defaultValue=''
          fullWidth
          onChange={handleSemesterChange}
        >
          {props.semesters.map((semester, index) => (
            <MenuItem
              key={index}
              value={semester}
            >
              {semester.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}