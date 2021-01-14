const express = require('express');
const { Semester, Course } = require('../../models');
const router = express.Router();

/**
 * @route POST api/grades/semesters
 * @description Creates new semester
 * @access private
 */
router.post('/', async (req, res, next) => {
  try {
    const semester = await Semester.create({ ...req.body, user_id: req.user.id });
    return res.status(200).json(semester);
  } catch (err) {
    console.log(err);
    next({ status: 400, message: 'Failed to create semester' });
  }
});

/**
 * @route GET api/grades/semesters
 * @description Gets all semesters of the user
 * @access private
 */
router.get('/', async (req, res, next) => {
  try {
    const semesters = await Semester.find({ user_id: req.user.id });
    return res.status(200).json(semesters);
  } catch (err) {
    next({ status: 400, message: 'Failed to get semesters' });
  }
});

/**
 * @route PUT api/grades/semesters
 * @description Updates a semester
 * @access private
 */
router.put('/:id', async (req, res, next) => {
  try {
    const semester = await Semester.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(semester);
  } catch (err) {
    next({ status: 400, message: 'Failed to update semester' });
  }
});

/**
 * @route DELETE api/grades/semesters
 * @description Deletes a semester
 * @access private
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await Semester.deleteOne({ _id: req.params.id });
    return res.status(200).json('Deleted semester');
  } catch (err) {
    next({ status: 400, message: 'Failed to delete semester' });
  }
});

/**
 * @route POST api/grades/semesters/grade
 * @description Calculates gpa for a semester
 * @access private
 */
router.post('/grade/:id', async (req, res, next) => {
  try {
    const semester = await Semester.findById(req.params.id);
    const courses = await Course.find({ semester_id: req.params.id, grade_points: { $ne: null } });

  } catch (err) {
    next({ status: 400, message: 'Failed to calculate GPA for semester' });
  }
});

module.exports = router;