const mongoose = require("mongoose");
const ApplicationSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPost",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mandatoryAddress: {
    type: String,
    required: true,
  },
  optionalAddress: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  phoneNabmer: {
    type: String,
    required: true,
  },
  alternateNumber: {
    type: String,
  },
  jobNeeded: {
    type: String,
    required: true,
  },
  otherJob: {
    type: String,
  },
  WorkingPeriod: {
    type: String,
    required: true,
  },
  workedUs: {
    type: String,
    required: true,
  },
  workedUsWhen_month: {
    type: String,
  },
  workedUsWhen_day: {
    type: Number,
  },
  workedUsWhen_year: {
    type: Number,
  },
  CV: {
    type: String,
    required: true,
  },
});

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
