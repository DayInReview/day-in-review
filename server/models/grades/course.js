const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const defaultCutoffs = {
  'A+': 92.5,
  'A-': 89.5,
  'B+': 86.5,
  'B': 82.5,
  'B-': 79.5,
  'C+': 76.5,
  'C': 72.5,
  'C-': 69.5,
  'D+': 66.5,
  'D': 62.5,
  'D-': 59.5
}

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cutoffs: {
    type: Object,
    default: defaultCutoffs,
  },
  semester_id: {
    type: Schema.Types.ObjectId,
    required: true,
  }
});

const courseModel = mongoose.model('Course', courseSchema);

module.exports = courseModel;
