const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  grade: {
    type: Number,
    default: null,
  },
  type_id: {
    type: Schema.Types.ObjectId,
    required: true,
  }
});

const assignmentModel = mongoose.model('Assignment', assignmentSchema);

module.exports = assignmentModel;
