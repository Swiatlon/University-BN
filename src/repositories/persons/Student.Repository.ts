import { AppDataSource } from '../../configs/database';
import { DataSource, In, Not } from 'typeorm';
import { IsNull } from 'typeorm';
import { Student } from 'entities/students/Student.Entity';
import { StudentDegreeCourse } from 'entities/studentDegrees/StudentDegreeCourse.Entity';
import { IStudentWithDegreeCourse } from 'types/studentDegree/StudentDegree.Interfaces';

export const StudentRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(Student).extend({
        async findStudentsWithoutAccount() {
            return this.findBy({
                account: IsNull(),
            });
        },

        async findStudentByAccountId(id: string) {
            return this.createQueryBuilder('student').where('student.account = :id', { id }).getOne();
        },

        async getUserBasicDataByAccountId(accountId: string) {
            return this.createQueryBuilder('student').where('student.account = :accountId', { accountId }).getOne();
        },

        async getStudentsWithoutDegreeCourses() {
            const studentsWithDegreeCourses: IStudentWithDegreeCourse[] = await dataSource
                .getRepository(StudentDegreeCourse)
                .createQueryBuilder('studentDegreeCourse')
                .select('studentDegreeCourse.student.id')
                .distinct(true)
                .getRawMany();

            const studentIdsWithDegreeCourses = studentsWithDegreeCourses.map((row) => row.studentDegreeCourse_student_id);

            return this.find({
                where: {
                    id: Not(In(studentIdsWithDegreeCourses)),
                },
                select: ['id'],
            });
        },

        async getStudentAllData(id: string) {
            const student = await this.createQueryBuilder('student')
                .leftJoinAndSelect('student.address', 'address')
                .leftJoinAndSelect('student.consent', 'consent')
                .leftJoinAndSelect('student.degreeCourses', 'degreeCourses')
                .leftJoinAndSelect('degreeCourses.degreeCourse', 'degreeCourse')
                .leftJoinAndSelect('student.degreePaths', 'degreePaths')
                .leftJoinAndSelect('degreePaths.degreePath', 'degreePath')
                .leftJoinAndSelect('student.modules', 'studentModule')
                .leftJoinAndSelect('studentModule.module', 'module')
                .leftJoinAndSelect('module.subjects', 'subjects')
                .where('student.id = :id', { id })
                .getOne();

            return student;
        },
    });
};
