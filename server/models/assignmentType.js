const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  drops: {
    type: Number,
    default: 0,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    required: true,
  }
});

const assignmentTypeModel = mongoose.model('AssignmentType', assignmentTypeSchema);

module.exports = assignmentTypeModel;
