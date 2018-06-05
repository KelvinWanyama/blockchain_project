var mongoose = require('mongoose');

var doctorSchema = mongoose.Schema({
  fullName: String,
  doctorID: String,
  password: String
});

var doctor = mongoose.model("all_doctors", doctorSchema);
module.exports = doctor;