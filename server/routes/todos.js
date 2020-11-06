const express = require("express");
const { Todo } = require("../models");
const router = express.Router();

/**
 * @route POST api/todos
 * @description Creates todo
 * @access public
 */
router.post("/", async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body);
    return res.status(200).json(todo);
  } catch (err) {
    next({ status: 400, message: "Failed to create todo" });
  }
});

/**
 * @route GET api/todos
 * @description Gets all todos
 * @access public
 */
router.get("/", async (req, res, next) => {
  try {
    const todos = await Todo.find({});
    return res.status(200).json(todos);
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "Failed to get todos" });
  }
});

/**
 * @route PUT api/todos
 * @description Updates a todo
 * @access public
 */
router.put("/:id", async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(todo);
  } catch (err) {
    next({ status: 400, message: "Failed to update todo" });
  }
});

/**
 * @route DELETE api/todos
 * @description deletes todo
 * @access public
 */
router.delete("/:id", async (req, res, next) => {
  try {
    await Todo.findByIdAndRemove(req.params.id);
    return res.status(200).json("Todo deleted");
  } catch (err) {
    next({ status: 400, message: "Failed to delete todo" });
  }
});

module.exports = router;