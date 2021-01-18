const express = require('express');
const { AssignmentType, Assignment } = require('../../models');
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

/**
 * @route POST api/grades/assignment-types/grade
 * @description Calculates the grade of an assignment type
 * @access private
 */
router.post('/grade/:id', async (req, res, next) => {
  try {
    const assignmentType = await AssignmentType.findById(req.params.id);
    const assignments = await Assignment.find({ type_id: req.params.id, grade: { $ne: null } });
    assignments.sort((a, b) => (a.grade - b.grade));  // Sorts least to greatest
    if (assignmentType.drops < assignments.length) {
      assignments.splice(0, assignmentType.drops);
    } else {
      assignments.splice(0, assignments.length-1);
    }
    const grade = assignments.length ? assignments.reduce((acc, val) => (acc + val.grade/assignments.length), 0) : null;
    const newAssignmentType = await AssignmentType.findByIdAndUpdate(req.params.id, {
      ...assignmentType._doc,
      grade,
    },
    {
      new: true,
    });
    return res.status(200).json(newAssignmentType);
  } catch (err) {
    console.log(err);
    next({ status: 400, message: 'Failed to calculate grade for assignment type' });
  }
});

module.exports = router;