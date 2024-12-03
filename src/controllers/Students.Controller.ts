import { HTTP_STATUS } from 'constants/general/general.Constants';
import { IStudentTodoDto } from 'dto/studentTodo/CreateStudentTodo';
import asyncHandler from 'express-async-handler';
import { studentService } from 'services/Students.Service';

const getStudentAllData = asyncHandler(async (req, res) => {
    const studentId = Number(req.params.id);
    const studentData = await studentService.getStudentAllData(studentId);

    res.status(HTTP_STATUS.OK.code).json(studentData);
});

const getStudentTodos = asyncHandler(async (req, res) => {
    const studentId = Number(req.params.id);
    const todos = await studentService.getStudentTodos(studentId);

    res.status(HTTP_STATUS.OK.code).json(todos);
});

const createStudentTodo = asyncHandler(async (req, res) => {
    const newTodoData = req.body as IStudentTodoDto;
    await studentService.createStudentTodo(newTodoData);

    res.status(HTTP_STATUS.CREATED.code).json({
        message: 'Todo created successfully',
    });
});

const editStudentTodo = asyncHandler(async (req, res) => {
    const todoId = Number(req.params.todoId);
    const updatedTodoData = req.body as IStudentTodoDto;
    await studentService.editStudentTodo(todoId, updatedTodoData);

    res.status(HTTP_STATUS.OK.code).json({ message: 'Todo updated successfully' });
});

const removeStudentTodo = asyncHandler(async (req, res) => {
    const todoId = Number(req.params.todoId);
    await studentService.removeStudentTodo(todoId);

    res.status(HTTP_STATUS.NO_CONTENT.code).send();
});

export const studentController = {
    getStudentAllData,
    getStudentTodos,
    editStudentTodo,
    removeStudentTodo,
    createStudentTodo,
};
