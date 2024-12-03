import { AppDataSource } from '../../configs/database';
import { DataSource, DeleteResult } from 'typeorm';
import { StudentTodo } from 'entities/students/StudentTodos.Entity';
import { IStudentTodoDto } from 'dto/studentTodo/CreateStudentTodo';

export const StudentTodoRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(StudentTodo).extend({
        async getStudentTodos(studentId: number) {
            return this.createQueryBuilder('todo')
                .leftJoinAndSelect('todo.student', 'students')
                .where('todo.student = :studentId', { studentId })
                .select(['todo', 'students.id'])
                .getMany();
        },

        async getStudentTodoById(todoId: number, studentId: number) {
            return this.createQueryBuilder('todo').where('todo.id = :todoId', { todoId }).andWhere('todo.studentId = :studentId', { studentId }).getOne();
        },

        async updateStudentTodoById(todoId: number, updatedData: IStudentTodoDto) {
            const todo = await this.createQueryBuilder('todo').where('todo.id = :todoId', { todoId }).getOne();

            if (!todo) {
                return null;
            }

            Object.assign(todo, updatedData);
            return this.save(todo);
        },

        async deleteStudentTodoById(todoId: number): Promise<DeleteResult> {
            return await this.createQueryBuilder().delete().from(StudentTodo).where('id = :todoId', { todoId }).execute();
        },
    });
};
