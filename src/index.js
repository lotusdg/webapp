const app = require("./app");

function enableGracefulExit() {
  const exitHandler = (err) => {
    if (err) {
      console.error(err);
    }
    console.log("Gracefully stopping...");
    app.stop();
  };

  process.on("SIGINT", exitHandler);
  process.on("SIGTERM", exitHandler);
  process.on("SIGUSR1", exitHandler);
  process.on("SIGUSR2", exitHandler);
  process.on("uncaughtException", exitHandler);
  process.on("unhandledRejection", exitHandler);
}

async function boot() {
  enableGracefulExit();
  await app.start();
}

boot();
