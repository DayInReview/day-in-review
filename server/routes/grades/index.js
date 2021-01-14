const express = require('express');
const router = express.Router();

const { Semester } = require('../../models');

const semesters = require('./semesters');
const courses = require('./courses');
const assignmentTypes = require('./assignmentTypes');
const assignments = require('./assignments');

/**
 * @route POST api/grades/gpa
 * @description Calculates total gpa of the user
 * @access private
 */
router.post('/gpa', async (req, res, next) => {
  try {
    const semesters = await Semester.find({ user_id: req.user.id, gpa: { $ne: null } });
    const totalHours = semesters.reduce((acc, val) => (acc + val.hours), 0);
    const gpa = semesters.reduce((acc, val) => (acc + val.gpa*val.hours/totalHours), 0);
    return res.status(200).json(gpa);
  } catch (err) {
    next({ status: 400, message: 'Failed to calculate GPA' });
  }
});

router.use("/semesters", semesters);
router.use("/courses", courses);
router.use("/assignment-types", assignmentTypes);
router.use("/assignments", assignments);

module.exports = router;