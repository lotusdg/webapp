import cron from 'node-cron';
import fs from 'fs';
import Appointment from '../db/models/appointment';
import User from '../db/models/user';
import Doctor from '../db/models/doctor';

async function job(hours: number) {
  try {
    const currentDate = new Date();
    const date = new Date();
    const findDate = new Date(
      date.setHours(date.getHours() + hours, date.getMinutes(), 0, 0)
    );

    const appointments = await Appointment.find({
      status: "accepted",
      active: true,
      date: findDate,
    });

    if (appointments.length > 0) {
      for await (const appointment of appointments) {
        const user = await User.findOne({ _id: appointment.user });
        const doctor = await Doctor.findOne({ _id: appointment.doctor });
        let message;
        if (hours === 2) {
          message =
            `${currentDate.toLocaleString()} | Привет ` +
            user!.name +
            "! Вам через 2 часа к " +
            doctor!.spec +
            ` в ${findDate.toLocaleTimeString()}!`;
        } else {
          message =
            `${currentDate.toLocaleString()} | Привет ` +
            user!.name +
            "! Напоминаем что вы записаны к " +
            doctor!.spec +
            ` завтра в ${findDate.toLocaleTimeString()}!`;
        }
        console.log(message);
        return fs.appendFileSync("../../src/logs.log", `\n${message}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

cron.schedule("* * * * *", async () => {
  job(2);
  job(24);
});

export = cron;
