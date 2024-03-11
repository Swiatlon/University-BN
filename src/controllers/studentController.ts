import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { studentService } from "../services/studentServices";

const createStudent = asyncHandler(async (req: Request, res: Response) => {
  const newStudent = await studentService.createStudent(req.body);
  res.status(201).json(newStudent);
});

const getHelloWorld = asyncHandler((req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

export const studentController = {
  createStudent,
  getHelloWorld,
};
