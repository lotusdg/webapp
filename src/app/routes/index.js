const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const { httpCodes, resFinish } = require("../../utils");
const services = require("../../services");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/appointments", services.createAppointment);
app.get("/appointments", services.getAllAppointments);
app.post("/appointments/:id/accepted", services.acceptAppointment);
app.post("/appointments/:id/rejected", services.rejectAppointment);

app.use((req, res) =>
  resFinish(res, httpCodes.notFound, { error: `Page not found ${req.path}` })
);

module.exports = app;
