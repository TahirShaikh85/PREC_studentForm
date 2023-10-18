const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  rollNo: { type: Number },
  name: { type: String, require: true },
  email: { type: String, require: true },
  age: { type: Number, require: true },
  department: { type: String, require: true },
  class: { type: String, require: true },
  DOB: { type: String, require: true },
  gender: { type: String, require: true },
  address: { type: String, require: true },
  village: { type: String, require: true },
  street: { type: String, require: true },
  locality: { type: String, require: true },
  taluka: { type: String, require: true },
  district: { type: String, require: true },
  state: { type: String, require: true },
  pinCode: { type: Number, require: true },
  studentMobile: { type: Number, require: true },
  parentMobile: { type: Number, require: true },
});

module.exports = StudentCollection = mongoose.model("Students", studentSchema);
