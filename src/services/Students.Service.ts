import { AppDataSource } from 'configs/database';
import { HTTP_STATUS } from 'constants/general/general.Constants';
import { IStudentTodoDto } from 'dto/studentTodo/CreateStudentTodo';
import { Student } from 'entities/students/Student.Entity';
import { StudentTodo } from 'entities/students/StudentTodos.Entity';
import { get } from 'lodash';
import { ApiError } from 'middlewares/apiErrors/ApiError';
import { StudentRepository } from 'repositories/persons/Student.Repository';
import { StudentTodoRepository } from 'repositories/studentTodo/StudentTodo.Repository';
import { DeleteResult, Repository } from 'typeorm';
import { IStudentCoursesResponse } from 'types/courses/Courses.Interfaces';
import { IStudentService } from 'types/services/Services.Interfaces';

export class StudentService implements IStudentService {
    private studentRepository: Repository<Student>;

    constructor() {
        this.studentRepository = AppDataSource.getRepository(Student);
    }

    async createStudent(studentData: Partial<Student>): Promise<Student> {
        const student = this.studentRepository.create(studentData);
        return this.studentRepository.save(student);
    }

    async getStudentAllData(studentId: number): Promise<Student | null> {
        return await StudentRepository().getStudentAllDataByStudentId(studentId);
    }

    async getStudentCourses(studentId: number): Promise<IStudentCoursesResponse | null> {
        const student = await StudentRepository().getStudentCoursesDataWithGradesByStudentId(studentId);

        if (!student) {
            return null;
        }

        const firstDegreeCourse = get(student, 'degreeCourses[0]', null);
        const firstDegreePath = get(student, 'degreePaths[0].degreePath', null);
        const modules = get(student, 'modules', []);
        const studentsGrades = get(student, 'studentGrades', []);

        if (!firstDegreeCourse || !firstDegreePath || !student) {
            return null;
        }

        const filteredData: IStudentCoursesResponse = {
            id: firstDegreeCourse.degreeCourse.id,
            name: firstDegreeCourse.degreeCourse.name,
            subjects: firstDegreeCourse.degreeCourse.subjects.map((subject) => ({
                id: subject.id,
                name: subject.name,
                grade: studentsGrades[subject.id]?.grade ?? null,
            })),
            degreePath: {
                id: firstDegreePath.id,
                name: firstDegreePath.name,
                modules: modules.map((module) => ({
                    id: module.module.id,
                    name: module.module.name,
                    subjects: module.module.subjects.map((subject) => ({
                        id: subject.id,
                        name: subject.name,
                        grade: studentsGrades[subject.id]?.grade ?? null,
                    })),
                })),
            },
        };

        return filteredData;
    }

    async getStudentTodos(studentId: number): Promise<StudentTodo[]> {
        return await StudentTodoRepository().getStudentTodos(studentId);
    }

    async createStudentTodo(todoData: Omit<IStudentTodoDto, 'id'>): Promise<StudentTodo> {
        const student = await this.studentRepository.findOne({ where: { id: todoData.student } });

        if (!student) {
            throw new ApiError(HTTP_STATUS.NOT_FOUND.code, 'Student not found');
        }

        const todo = StudentTodoRepository().create({ ...todoData, student });

        return await StudentTodoRepository().save(todo);
    }

    async removeStudentTodo(todoId: number): Promise<DeleteResult> {
        const result = await StudentTodoRepository().deleteStudentTodoById(todoId);

        if (result.affected === 0) {
            throw new ApiError(HTTP_STATUS.NOT_FOUND.code, 'Todo not found');
        }

        return result;
    }

    async editStudentTodo(todoId: number, updatedData: IStudentTodoDto): Promise<StudentTodo | null> {
        const updatedTodo = await StudentTodoRepository().updateStudentTodoById(todoId, updatedData);

        if (!updatedTodo) {
            throw new ApiError(HTTP_STATUS.NOT_FOUND.code, 'Todo not found');
        }

        return updatedTodo;
    }
}

export const studentService = new StudentService();
