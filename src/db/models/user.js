const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const userSchema = new Schema(
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
      default: "user",
    },
    appointments: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
