import { AppDataSource } from 'configs/database';
import { Grade } from 'entities/studentsGrades/StudentGrades.Entity';
import { GradesRepository } from 'repositories/degreeCourses/Grades.Repository';
import { Repository } from 'typeorm';
import { IGradesService } from 'types/services/Services.Interfaces';

export class GradesService implements IGradesService {
    private gradesRepository: Repository<Grade>;

    constructor() {
        this.gradesRepository = AppDataSource.getRepository(Grade);
    }

    async getGradesByStudentId(studentId: string): Promise<Grade[]> {
        return GradesRepository().getGradesByStudentId(studentId);
    }
}
