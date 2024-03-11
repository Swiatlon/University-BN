import express from "express";
import { studentController } from "../controllers/studentController";

const router = express.Router();

router
  .route("/students")
  .post(studentController.createStudent)
  .get(studentController.getHelloWorld);

export default router;
