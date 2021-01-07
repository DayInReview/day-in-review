const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = require('./course');

const semesterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  current: {
    type: Boolean,
    default: false,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  }
});

semesterSchema.pre('deleteOne', async function() {
  const id = this._conditions._id;
  Course.deleteMany({semester_id: id}, (err) => {
    if (err)
      console.log(err);
  });
});

semesterSchema.pre('deleteMany', async function() {
  const user = this._conditions.user_id;
  const semesters = await this.model.find({ user_id: user });
  for (const semester of semesters) {
    await Course.deleteMany({ semester_id: semester._id });
  }
});

const semesterModel = mongoose.model('Semester', semesterSchema);

module.exports = semesterModel;
