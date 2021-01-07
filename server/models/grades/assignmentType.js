const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Assignment = require('./assignment');

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

assignmentTypeSchema.pre('deleteOne', async function() {
  const id = this._conditions._id;
  Assignment.deleteMany({type_id: id}, (err) => {
    if (err)
      console.log(err);
  });
});

assignmentTypeSchema.pre('deleteMany', async function() {
  const course = this._conditions.course_id;
  const assignmentTypes = await this.model.find({ course_id: course });
  for (const type of assignmentTypes) {
    await Assignment.deleteMany({ type_id: type._id });
  }
});

const assignmentTypeModel = mongoose.model('AssignmentType', assignmentTypeSchema);

module.exports = assignmentTypeModel;
