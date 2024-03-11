import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { handleSequelizeError } from "../utils/Sequelize";

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sequelizeErrorResponse = handleSequelizeError(err);

  if (sequelizeErrorResponse) {
    return res.status(sequelizeErrorResponse.status).json({
      message: sequelizeErrorResponse.message,
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
      isError: true,
    });
  }

  const status = res.statusCode ? res.statusCode : 500;

  res.status(status).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    isError: true,
  });
};

export default errorHandler;
