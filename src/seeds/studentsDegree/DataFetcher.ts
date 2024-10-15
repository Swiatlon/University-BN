import { DegreeCourse } from 'entities/courses/DegreeCourse.Entity';
import { StudentRepository } from 'repositories/persons/Student.Repository';
import { AppDataSource } from 'configs/database';
import { IDataFetcher, IDataFetcherResult } from 'types/studentDegree/StudentDegree.Interfaces';

export class DataFetcher implements IDataFetcher {
    async fetchAllData(): Promise<IDataFetcherResult> {
        const degreeCourseRepository = AppDataSource.getRepository(DegreeCourse);

        const degreeCoursesTree = await degreeCourseRepository.find({ relations: ['degreePaths', 'degreePaths.modules'] });
        const studentsWithoutDegreeCourses = await StudentRepository(AppDataSource).getStudentsWithoutDegreeCourses();

        return { degreeCoursesTree, studentsWithoutDegreeCourses };
    }
}
