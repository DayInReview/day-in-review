const express = require('express');
const router = express.Router();

const semesters = require('./semesters');
const courses = require('./courses');
const assignmentTypes = require('./assignmentTypes');
const assignments = require('./assignments');

router.use("/semesters", semesters);
router.use("/courses", courses);
router.use("/assignment-types", assignmentTypes);
router.use("/assignments", assignments);

module.exports = router;