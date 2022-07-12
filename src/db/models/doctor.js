const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const doctorSchema = new Schema(
  {
    _id: { type: String, default: uuidv4() },
    email: {
      type: String,
      required: true,
    },
    reg_token: {
      type: String,
      required: true,
    },
    photo_avatar: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "doc",
    },
    spec: {
      type: String,
      required: true,
    },
    free: {
      type: Boolean,
      required: true,
    },
    appointments_accepted: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
