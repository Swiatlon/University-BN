import { AppDataSource } from '../../configs/database';
import { DataSource } from 'typeorm';
import { Grade } from 'entities/studentsGrades/StudentGrades.Entity';

export const GradesRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(Grade).extend({
        async getGradesByStudentId(studentId: number) {
            return this.createQueryBuilder('grades')
                .where('grades.studentId = :studentId', { studentId })
                .leftJoinAndSelect('grades.subject', 'subject')
                .getMany();
        },
    });
};
