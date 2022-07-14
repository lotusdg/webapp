import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import services from '../../services';
import { httpCodes, resFinish } from '../../utils';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/appointments", services.createAppointment);
app.get("/appointments", services.getAllAppointments);
app.post("/appointments/:id/accepted", services.acceptAppointment);
app.post("/appointments/:id/rejected", services.rejectAppointment);

app.use((req: Request, res: Response) =>
  resFinish(res, httpCodes.notFound, { error: `Page not found ${req.path}` })
);

export = app;
