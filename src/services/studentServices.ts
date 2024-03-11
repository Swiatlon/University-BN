import { Student } from "../models/studentModel";

const createStudent = async (studentData: {
  name: string;
  surname: string;
  dateOfBirth: Date;
  pesel: string;
  gender: "men" | "women";
  accountId: string;
}) => {
  const student = await Student.create(studentData);
  return student;
};

export const studentService = {
  createStudent,
};
