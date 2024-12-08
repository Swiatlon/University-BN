import express from 'express';
import { studentController } from 'controllers/Students.Controller';
import { verifyJWT } from 'middlewares/verifyJwt/verifyJWT';
import { RolesEnum } from 'constants/entities/entities.Constants';
import hasAccessToEndpointData from 'middlewares/hasAccessToEndpointData/HasAccessToEndpointData.Middleware';
import { Student } from 'entities/students/Student.Entity';
import { validateDto } from 'middlewares/validateDto/ValidateDto';
import { StudentTodoDto } from 'dto/studentTodo/CreateStudentTodo';

const router = express.Router();

router.get('/:id/allData', verifyJWT, hasAccessToEndpointData([RolesEnum.ADMIN, RolesEnum.STUDENT], Student), studentController.getStudentAllData);
router.get('/:id/courses', verifyJWT, hasAccessToEndpointData([RolesEnum.ADMIN, RolesEnum.STUDENT], Student), studentController.getStudentCoursesData);
router.get('/:id/todos', verifyJWT, studentController.getStudentTodos);
router
    .route('/:id/todos/:todoId')
    .put(verifyJWT, hasAccessToEndpointData([RolesEnum.ADMIN, RolesEnum.STUDENT], Student), studentController.editStudentTodo)
    .delete(verifyJWT, hasAccessToEndpointData([RolesEnum.ADMIN, RolesEnum.STUDENT], Student), studentController.removeStudentTodo);
router.route('/todos').post(verifyJWT, validateDto(StudentTodoDto), studentController.createStudentTodo);

export default router;
