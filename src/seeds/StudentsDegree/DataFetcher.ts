import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { StudentRepository } from 'repositories/Persons/Student.Repository';
import { AppDataSource } from 'configs/database';
import { IDataFetcher, IDataFetcherResult } from 'types/StudentDegree/StudentDegree.Interfaces';

export class DataFetcher implements IDataFetcher {
    async fetchAllData(): Promise<IDataFetcherResult> {
        const degreeCourseRepository = AppDataSource.getRepository(DegreeCourse);

        const degreeCoursesTree = await degreeCourseRepository.find({ relations: ['degreePaths', 'degreePaths.modules'] });
        const studentsWithoutDegreeCourses = await StudentRepository(AppDataSource).getStudentsWithoutDegreeCourses();

        return { degreeCoursesTree, studentsWithoutDegreeCourses };
    }
}
