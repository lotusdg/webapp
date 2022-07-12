const { port } = require("../config");
const app = require("./routes");
const { connectDb } = require("../db");
require("../services/node-cron");

let listener;

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

module.exports = {
  start,
  stop,
};
