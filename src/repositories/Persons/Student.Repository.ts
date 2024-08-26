import { AppDataSource } from '../../configs/database';
import { DataSource, In, Not } from 'typeorm';
import { IsNull } from 'typeorm';
import { Student } from 'entities/Students/Student.Entity';
import { StudentDegreeCourse } from 'entities/StudentDegrees/StudentDegreeCourse.Entity';
import { IStudentWithDegreeCourse } from 'types/StudentDegree/StudentDegree.Interfaces';

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
            const student = await this.findOne({
                where: { id },
                relations: ['address', 'consent', 'degreeCourses.degreeCourse', 'degreePaths.degreePath', 'modules.module'],
            });

            return student;
        },
    });
};
