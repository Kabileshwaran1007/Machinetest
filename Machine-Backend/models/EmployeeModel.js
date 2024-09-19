const mongoose = require('mongoose');

const formEmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  courses: [String],
  imgUpload: { type: String, required: true } // Path to the uploaded image
});

const FormEmployee = mongoose.model('FormEmployee', formEmployeeSchema);

module.exports = FormEmployee;
