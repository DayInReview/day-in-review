const mongoose = require("mongoose"); // requiring the mongoose package
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  // creating a schema for todo
  task: {
    // field1: task
    type: String, // task is a string
    required: true, // it is required
  },
  completed: {
    // field2: completed
    type: Boolean, // it is a boolean
    default: false, // the default is false
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  }
});

const todoModel = mongoose.model("Todo", todoSchema); // creating the model from the schema

module.exports = todoModel; // exporting the model
