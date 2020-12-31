const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const semesterModel = mongoose.model('Semester', semesterSchema);

module.exports = semesterModel;
