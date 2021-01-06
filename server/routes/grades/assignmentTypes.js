const express = require('express');
const { AssignmentType } = require('../../models');
const router = express.Router();

/**
 * @route POST api/grades/assignment-types
 * @description Creates assignment type
 * @access private
 */
router.post('/', async (req, res, next) => {
  try {
    const assignmentType = await AssignmentType.create(req.body);
    return res.status(200).json(assignmentType);
  } catch (err) {
    next({ status: 400, message: 'Failed to create assignment type' });
  }
});

/**
 * @route GET api/grades/assignment-types
 * @description Gets all assignment types for a course
 * @access private
 */
router.get('/:course', async (req, res, next) => {
  try {
    const assignmentTypes = await AssignmentType.find({ course_id: req.params.course });
    return res.status(200).json(assignmentTypes);
  } catch (err) {
    next({ status: 400, message: 'Failed to get assignment types' });
  }
});

/**
 * @route PUT api/grades/assignment-types
 * @description Updates an assignment type
 * @access private
 */
router.put('/:id', async (req, res, next) => {
  try {
    const assignmentType = await AssignmentType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(assignmentType);
  } catch (err) {
    next({ status: 400, message: 'Failed to update assignment type' });
  }
});

/**
 * @route DELETE api/grades/assignment-types
 * @description Deletes an assignment type
 * @access private
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await AssignmentType.findByIdAndDelete(req.params.id);
    return res.status(200).json('Assignment Type deleted');
  } catch (err) {
    next({ status: 400, message: 'Failed to delete assignment type' });
  }
});

module.exports = router;