import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export = Appointment;
