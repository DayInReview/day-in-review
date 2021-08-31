const express = require('express');
const { Course, AssignmentType, Assignment } = require('../../models');
const router = express.Router();

/**
 * @route POST api/grades/assignments
 * @description Creates new assignment
 * @access private
 */
router.post('/', async (req, res, next) => {
  try {
    const assignment = await Assignment.create(req.body);
    return res.status(200).json(assignment);
  } catch (err) {
    next({ status: 400, message: 'Failed to create assignment' });
  }
});

/**
 * @route GET api/grades/assignments
 * @description Gets all assignments that are incomplete for this semester
 * @access private
 */
router.get('/upcoming/:semester', async (req, res, next) => {
  try {
    const assignments = await Assignment.find({ semester_id: req.params.semester, completed: false }, null, { sort: 'due_date' });
    const grouped = assignments.reduce((acc, val) => ({
      ...acc,
      [val.due_date.toString()]: [...acc[val.due_date.toString()] || [], val],
    }), {});
    return res.status(200).json(grouped);
  } catch (err) {
    console.log(err);
    next({ status: 400, message: 'Failed to get assignments' });
  }
});

/**
 * @route GET api/grades/assignments
 * @description Gets all assignments of certain type
 * @access private
 */
router.get('/type/:type', async (req, res, next) => {
  try {
    const assignments = await Assignment.find({ type_id: req.params.type });
    return res.status(200).json(assignments);
  } catch (err) {
    next({ status: 400, message: 'Failed to get assignments' });
  }
});

/**
 * @route PUT api/grades/assignments
 * @description Updates assignment
 * @access private
 */
router.put('/:id', async (req, res, next) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(assignment);
  } catch (err) {
    next({ status: 400, message: 'Failed to update assignment' });
  }
});

/**
 * @route DELETE api/grades/assignments
 * @description Deletes assignment
 * @access private
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    return res.status(200).json('Deleted assignment');
  } catch (err) {
    next({ status: 400, message: 'Failed to delete assignment' });
  }
});

module.exports = router;