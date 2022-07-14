import { Response } from "express";

const httpCodes = {
  ok: 200,
  badReq: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  serverError: 500,
  notImplemented: 501,
};

function resFinish(res: Response, code: number, message: object) {
  res.status(code).json(message);
}

export {
  httpCodes,
  resFinish,
};
