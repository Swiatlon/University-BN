import { AppDataSource } from '../../configs/database';
import { DataSource } from 'typeorm';
import { Grade } from 'entities/studentsGrades/StudentGrades.Entity';

export const GradesRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(Grade).extend({
        async getGradesByStudentId(studentId: number) {
            return this.createQueryBuilder('grades')
                .leftJoinAndSelect('grades.subject', 'subject')
                .where('grades.studentId = :studentId', { studentId })
                .getMany();
        },
    });
};
