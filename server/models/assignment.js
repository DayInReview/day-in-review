const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  type_id: {
    type: Schema.Types.ObjectId,
    required: true,
  }
});

const assignmentModel = mongoose.model('Assignment', assignmentSchema);

module.exports = assignmentModel;
