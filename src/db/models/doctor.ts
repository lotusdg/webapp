import mongoose from 'mongoose';
import {v4} from 'uuid';

const Schema = mongoose.Schema;

const doctorSchema = new Schema(
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

export = Doctor;
