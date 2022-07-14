import { httpCodes, resFinish } from '../utils'; 
import Appointment from '../db/models/appointment';
import User from '../db/models/user';
import Doctor from '../db/models/doctor';
import { Request, Response } from 'express';
import { formsErrorMessage } from './helpers';

async function createAppointment(req: Request, res: Response) {
  try {
    const { userId, doctorId, date } = req.body;

    if (!userId || !doctorId || !date) {
      throw new Error("req.body had not pass the validation.");
    }

    const appointmentDate = new Date(new Date(date).setSeconds(0, 0));
    const newDate = new Date(date);
    const dateBetween = new Date(newDate.setHours(0, 0, 0));
    const dateEnd = new Date(newDate.setHours(24, 0, 0, 0));

    const docAppointments = await Appointment.find({
      doctor: doctorId,
      date: {
        $gte: dateBetween,
        $lt: dateEnd,
      },
      active: true,
      status: "accepted",
    }).exec();

    if (docAppointments.length >= 3) {
      throw new Error("Doctor is busy.");
    }

    const appointment = new Appointment({
      date: appointmentDate,
      user: userId,
      doctor: doctorId,
      active: true,
      status: "planned",
    });

    await appointment.save();

    return resFinish(res, httpCodes.ok, { success: true });
  } catch (err) {
    const message = await formsErrorMessage(err);
    return resFinish(res, httpCodes.badReq, { error: message });
  }
}

async function getAllAppointments(req: Request, res: Response) {
  try {
    let filter: any = {};
    if (req.query.date) filter.date = req.query.date;
    if (req.query.user) filter.user = req.query.user;
    if (req.query.doctor) filter.doctor = req.query.doctor;
    if (req.query.active) filter.active = req.query.active;
    if (req.query.status) filter.status = req.query.status;

    const appointments = await Appointment.find(filter).exec();

    return resFinish(res, httpCodes.ok, appointments);
  } catch (err) {
    const message = await formsErrorMessage(err);
    return resFinish(res, httpCodes.badReq, { error: message });
  }
}

async function acceptAppointment(req: Request, res: Response) {
  try {
    const appointmentId = req.params.id;
    const { doctorId, userId } = req.body;

    if (!userId || !doctorId) {
      throw new Error("req.body had not pass the validation.");
    }

    const checkAppointment = await Appointment.findOne({
      _id: appointmentId,
      doctor: doctorId,
      user: userId,
    }).exec();

    if (!checkAppointment) {
      throw new Error("No appointments was found with these parameters.");
    } else if (checkAppointment.date < new Date()) {
      await Appointment.updateOne(
        { _id: appointmentId },
        { active: false, status: "accepted" }
      );
      return resFinish(res, httpCodes.ok, { success: true });
    }

    await Appointment.updateOne(
      { _id: appointmentId },
      { active: true, status: "accepted" }
    );

    await Doctor.updateOne(
      { _id: doctorId },
      { $push: { appointments_accepted: appointmentId } },
      { upsert: true, setDefaultsOnInsert: true }
    );

    await User.updateOne(
      { _id: userId },
      { $push: { appointments: appointmentId } },
      { upsert: true, setDefaultsOnInsert: true }
    );

    return resFinish(res, httpCodes.ok, { success: true });
  } catch (err) {
    const message = await formsErrorMessage(err);
    return resFinish(res, httpCodes.badReq, { error: message });
  }
}

async function rejectAppointment(req: Request, res: Response) {
  try {
    const appointmentId = req.params.id;
    const { doctorId, userId } = req.body;

    if (!userId || !doctorId) {
      throw new Error("req.body had not pass the validation.");
    }

    const checkAppointment = await Appointment.findOne({
      _id: appointmentId,
      doctor: doctorId,
      user: userId,
    }).exec();

    if (!checkAppointment) {
      throw new Error("No appointments was found with these parameters.");
    }

    await Appointment.deleteOne({ _id: appointmentId });

    return resFinish(res, httpCodes.ok, { success: true });
  } catch (err) {
    const message = await formsErrorMessage(err);
    return resFinish(res, httpCodes.badReq, { error: message });
  }
}

export = {
  createAppointment,
  getAllAppointments,
  acceptAppointment,
  rejectAppointment,
};
