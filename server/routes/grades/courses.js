const express = require('express');
const { Course } = require('../../models');
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
    next({ status: 400, message: 'Failed to create course' });
  }
});

/**
 * @route GET api/grades/courses
 * @description Gets all courses from a semester
 * @access private
 */
router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find(req.body);
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

 module.exports = router;