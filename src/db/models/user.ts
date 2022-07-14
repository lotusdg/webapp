import mongoose from 'mongoose';
import {v4} from 'uuid';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: { type: String, default: v4() },
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

export = User;
