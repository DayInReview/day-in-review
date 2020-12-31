const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const defaultCutoffs = {
  A: 92.5,
  Am: 89.5,
  Bp: 86.5,
  B: 82.5,
  Bm: 79.5,
  Cp: 76.5,
  C: 72.5,
  Cm: 69.5,
  Dp: 66.5,
  D: 62.5,
  Dm: 59.5
}

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  semester: {
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
