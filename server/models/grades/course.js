const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AssignmentType = require('./assignmentType');


const defaultCutoffs = {
  'A': 92.5,
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
  grade: {
    type: Number,
    default: null,
  },
  semester_id: {
    type: Schema.Types.ObjectId,
    required: true,
  }
});

courseSchema.pre('deleteOne', async function() {
  const id = this._conditions._id;
  AssignmentType.deleteMany({course_id: id}, (err) => {
    if (err)
      console.log(err);
  });
})

courseSchema.pre('deleteMany', async function() {
  const semester = this._conditions.semester_id;
  const courses = await this.model.find({ semester_id: semester });
  for (const course of courses) {
    await AssignmentType.deleteMany({ course_id: course._id });
  }
});

const courseModel = mongoose.model('Course', courseSchema);

module.exports = courseModel;
