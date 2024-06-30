import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { DataFetcher } from './DataFetcher';
import { IDataFetcher } from 'interfaces/StudentDegree/IStudentDegree';
import { getRandomElement, getRandomElements } from 'utils/globalHelpers';
import { StudentDegreeCourseFactory } from 'factories/StudentDegrees/StudentDegreeCourse.Factory';
import { StudentDegreePathFactory } from 'factories/StudentDegrees/StudentDegreePath.Factory';
import { StudentModuleFactory } from 'factories/StudentDegrees/StudentModuleFactory';
import { AMOUNT_OF_CREATED_MODULES } from 'constants/seeders/seeder.Constants';

export class StudentsDegreeSeeder implements Seeder {
    private dataFetcher: IDataFetcher = new DataFetcher();
    private studentDegreeCourseFactory: StudentDegreeCourseFactory = new StudentDegreeCourseFactory();
    private studentDegreePathFactory: StudentDegreePathFactory = new StudentDegreePathFactory();
    private studentModuleFactory: StudentModuleFactory = new StudentModuleFactory();

    public async run(dataSource: DataSource): Promise<void> {
        await dataSource.transaction(async (transactionalEntityManager) => {
            try {
                const { degreeCoursesTree, studentsWithoutDegreeCourses } = await this.dataFetcher.fetchAllData();

                for (const student of studentsWithoutDegreeCourses) {
                    // Select a random degree course
                    const degreeCourse = getRandomElement(degreeCoursesTree);
                    const degreePaths = degreeCourse.degreePaths;

                    // Select a random path from the degree course
                    const degreePath = getRandomElement(degreePaths);
                    const modules = degreePath.modules;

                    // Select two random modules from the path
                    const selectedModules = getRandomElements(modules, AMOUNT_OF_CREATED_MODULES);

                    // Create and save StudentDegreeCourse
                    const studentDegreeCourse = this.studentDegreeCourseFactory.create(student, degreeCourse);
                    await transactionalEntityManager.save(studentDegreeCourse);

                    // Create and save StudentDegreePath
                    const studentDegreePath = this.studentDegreePathFactory.create(student, degreePath, degreeCourse);
                    await transactionalEntityManager.save(studentDegreePath);

                    // Create and save StudentModules
                    for (const module of selectedModules) {
                        const studentModule = this.studentModuleFactory.create(student, module);
                        await transactionalEntityManager.save(studentModule);
                    }
                }
            } catch (error) {
                console.error('Error when assigning degrees to students:', error);
                throw error;
            }
        });
    }
}
