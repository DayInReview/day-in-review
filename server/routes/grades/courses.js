const express = require('express');
const { Course, AssignmentType } = require('../../models');
const router = express.Router();

/**
 * @route POST api/grades/courses
 * @description Creates course
 * @access private
 */
router.post('/', async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    return res.status(200).json(course);
  } catch (err) {
    console.log(err);
    next({ status: 400, message: 'Failed to create course' });
  }
});

/**
 * @route GET api/grades/courses
 * @description Gets all courses
 * @access private
 */
router.get('/:semester', async (req, res, next) => {
  try {
    const courses = await Course.find({ semester_id: req.params.semester });
    return res.status(200).json(courses);
  } catch (err) {
    console.log(err);
    next({ status: 400, message: 'Failed to get courses' });
  }
});

/**
 * @route PUT api/grades/courses
 * @description Updates a course
 * @access private
 */
router.put('/:id', async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(course);
  } catch (err) {
    next({ status: 400, message: 'Failed to update course' });
  }
});

/**
 * @route DELETE api/grades/courses
 * @description Deletes course
 * @access private
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await Course.findByIdAndRemove(req.params.id);
    return res.status(200).json('Course deleted');
  } catch (err) {
    next({ status: 400, message: 'Failed to delete course' });
  }
});

/**
 * @route POST api/grades/courses/grade
 * @description Calculates the grade of a course
 * @access private
 */
router.post('/grade/:id', async (req, res, next) => {
  const points = {
    'A': 4, 'A-': 3.67,
    'B+': 3.33, 'B': 3, 'B-': 2.67,
    'C+': 2.33, 'C': 2, 'C-': 1.67,
    'D+': 1.33, 'D': 1, 'D-': .67,
    'F': 0,
  }
  try {
    const course = await Course.findById(req.params.id);
    const assignmentTypes = await AssignmentType.find({ course_id: req.params.id, grade: { $ne: null } });
    const totalWeight = assignmentTypes.reduce((acc, val) => (acc + val.weight), 0);
    const grade = assignmentTypes.reduce((acc, val) => (acc + val.grade*val.weight/totalWeight), 0);
    let grade_points = points['F'];
    for (const letter of Object.keys(course.cutoffs)) {
      if (grade >= course.cutoffs[letter]) {
        grade_points = points[letter];
        break;
      }
    }
    const newCourse = await Course.findByIdAndUpdate(req.params.id, {
      ...course._doc,
      grade,
      grade_points,
    },
    {
      new: true,
    });
    return res.status(200).json(newCourse);
  } catch (err) {
    next({ status: 400, message: 'Failed to calculate grade for course' });
  }
});

 module.exports = router;