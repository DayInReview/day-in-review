import API from '../API';

// GPA
const GPA_URL = '/grades/gpa';

async function calculateGPA() {
  const { data: gpa } = await API.post(GPA_URL);
  return gpa;
}

// Semesters
const SEMESTER_URL = '/grades/semesters/';

async function createSemester(semester) {
  const { data: newSemester } = await API.post(SEMESTER_URL, semester);
  return newSemester;
}

async function getAllSemesters() {
  const { data: semesters } = await API.get(SEMESTER_URL);
  return semesters;
}

async function updateSemester(id, payload) {
  const { data: newSemester } = await API.put(`${SEMESTER_URL}${id}`, payload);
  return newSemester;
}

async function deleteSemester(id) {
  const message = await API.delete(`${SEMESTER_URL}${id}`);
  return message;
}

async function calculateSemesterGrade(id) {
  const { data: newSemester } = await API.post(`${SEMESTER_URL}grade/${id}`);
  return newSemester;
}

// Courses
const COURSE_URL = '/grades/courses/';

async function createCourse(course) {
  const { data: newCourse } = await API.post(COURSE_URL, course);
  return newCourse;
}

async function getAllCourses(semester) {
  const { data: courses } = await API.get(`${COURSE_URL}${semester._id}`);
  return courses;
}

async function updateCourse(id, payload) {
  const { data: newCourse } = await API.put(`${COURSE_URL}${id}`, payload);
  return newCourse;
}

async function deleteCourse(id) {
  const message = await API.delete(`${COURSE_URL}${id}`);
  return message;
}

async function calculateCourseGrade(id) {
  const { data: course } = await API.post(`${COURSE_URL}grade/${id}`);
  return course;
}

// Assignment Types
const ASSIGNMENT_TYPES_URL = '/grades/assignment-types/';

async function createAssignmentType(assignmentType) {
  const { data: newAssignmentType } = await API.post(ASSIGNMENT_TYPES_URL, assignmentType);
  return newAssignmentType;
}

async function getAllAssignmentTypes(course) {
  const { data: assignmentTypes } = await API.get(`${ASSIGNMENT_TYPES_URL}${course._id}`);
  return assignmentTypes;
}

async function updateAssignmentType(id, payload) {
  const { data: newAssignmentType } = await API.put(`${ASSIGNMENT_TYPES_URL}${id}`, payload);
  return newAssignmentType;
}

async function deleteAssignmentType(id) {
  const message = await API.delete(`${ASSIGNMENT_TYPES_URL}${id}`);
  return message;
}

async function calculateAssignmentTypeGrade(id) {
  const { data: assignmentType } = await API.post(`${ASSIGNMENT_TYPES_URL}grade/${id}`);
  return assignmentType;
}

// Assignments
const ASSIGNMENT_URL = '/grades/assignments/';

async function createAssignment(assignment) {
  const { data: newAssignment } = await API.post(ASSIGNMENT_URL, assignment);
  return newAssignment;
}

async function getAllAssignments(assignmentType) {
  const { data: assignments } = await API.get(`${ASSIGNMENT_URL}type/${assignmentType._id}`);
  return assignments;
}

async function getAllUpcomingAssignments(semester) {
  const { data: assignments } = await API.get(`${ASSIGNMENT_URL}upcoming/${semester._id}`);
  return assignments;
}

async function updateAssignment(id, payload) {
  const { data: newAssignment } = await API.put(`${ASSIGNMENT_URL}${id}`, payload);
  return newAssignment;
}

async function deleteAssignment(id) {
  const message = await API.delete(`${ASSIGNMENT_URL}${id}`);
  return message;
}

export default {
  createSemester, getAllSemesters, updateSemester, deleteSemester, calculateSemesterGrade,
  createCourse, getAllCourses, updateCourse, deleteCourse, calculateCourseGrade,
  createAssignmentType, getAllAssignmentTypes, updateAssignmentType, deleteAssignmentType, calculateAssignmentTypeGrade,
  createAssignment, getAllAssignments, getAllUpcomingAssignments, updateAssignment, deleteAssignment,
  calculateGPA,
}