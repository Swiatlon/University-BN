import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { StudentRepository } from 'repositories/Persons/Student.Repository';
import { IDataFetcher } from 'interfaces/StudentDegree/IStudentDegree';
import { AppDataSource } from 'configs/database';

export class DataFetcher implements IDataFetcher {
    async fetchAllData() {
        const degreeCourseRepository = AppDataSource.getRepository(DegreeCourse);

        const degreeCoursesTree = await degreeCourseRepository.find({ relations: ['degreePaths', 'degreePaths.modules'] });
        const studentsWithoutDegreeCourses = await StudentRepository(AppDataSource).getStudentsWithoutDegreeCourses();

        return { degreeCoursesTree, studentsWithoutDegreeCourses };
    }
}
