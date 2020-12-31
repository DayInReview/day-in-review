import API from '../API';

// Courses
const COURSE_URL = '/courses/';

async function createCourse(course) {
  const { data: newCourse } = await API.post(COURSE_URL, {
    course,
  });
  return newCourse;
}

async function getAllCourses() {
  const { data: courses } = await API.get(COURSE_URL);
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

// Assignment Types
const ASSIGNMENT_TYPES_URL = '/assignment-types/';

async function createAssignmentType(assignmentType) {
  const { data: newAssignmentType } = await API.post(ASSIGNMENT_TYPES_URL, {
    assignmentType,
  });
  return newAssignmentType;
}

async function getAllAssignmentTypes() {
  const { data: assignmentTypes } = await API.get(ASSIGNMENT_TYPES_URL);
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

// Assignments
const ASSIGNMENT_URL = '/assignments/';

async function createAssignment(assignment) {
  const { data: newAssignment } = await API.post(ASSIGNMENT_URL, {
    assignment,
  });
  return newAssignment;
}

async function getAllAssignments() {
  const { data: assignments } = await API.get(ASSIGNMENT_URL);
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
  createCourse, getAllCourses, updateCourse, deleteCourse,
  createAssignmentType, getAllAssignmentTypes, updateAssignmentType, deleteAssignmentType,
  createAssignment, getAllAssignments, updateAssignment, deleteAssignment,
}