
import { port } from '../config';
import app from './routes';
import { connectDb } from '../db'

import "../services/node-cron";
import { Server } from 'http';

let listener: Server;

async function start() {
  try {
    await connectDb();
    listener = app.listen(port, () => {
      console.log(`Application successfully started on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

function stop() {
  if (!app) {
    return;
  }
  listener.close((err) => {
    if (err) {
      console.error(err, "Failed to close application!");
      return;
    }
    console.log("Application has been stopped.");
    process.exit(1);
  });
}

export {
  start,
  stop,
};
