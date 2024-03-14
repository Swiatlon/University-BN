import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Student from "../entities/studentEntity";

const createStudent = asyncHandler(async (req: Request, res: Response) => {
  // const newStudent
  const newStudent = new Student();
  console.log(req.body);

  res.status(201).json("new student");
});

const getHelloWorld = asyncHandler((req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

export const studentController = {
  createStudent,
  getHelloWorld,
};
