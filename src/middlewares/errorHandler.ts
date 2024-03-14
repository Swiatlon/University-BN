import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = res.statusCode ? res.statusCode : 500;

  res.status(status).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    isError: true,
  });
};

export default errorHandler;
