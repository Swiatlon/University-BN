import { Grade } from 'entities/studentsGrades/StudentGrades.Entity';
import { GradesRepository } from 'repositories/degreeCourses/Grades.Repository';
import { IGradesService } from 'types/services/Services.Interfaces';

export class GradesService implements IGradesService {
    async getGradesByStudentId(studentId: number): Promise<Grade[]> {
        return GradesRepository().getGradesByStudentId(studentId);
    }
}

export const gradesService = new GradesService();
