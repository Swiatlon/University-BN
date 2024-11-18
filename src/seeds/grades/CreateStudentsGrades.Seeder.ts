import { AMOUNT_OF_CREATED_GRADES, BATCH_SIZE } from 'constants/seeders/seeder.Constants';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';
import { DataSource } from 'typeorm';
import { Student } from 'entities/students/Student.Entity';
import { Subject } from 'entities/courses/Subject.Entity';
import { GradeFactory } from 'factories/grades/Grades.Factory';
import { faker } from '@faker-js/faker';
import { Grade } from 'entities/studentsGrades/StudentGrades.Entity';
import { StudentDegreeCourse } from 'entities/studentDegrees/StudentDegreeCourse.Entity';
import { StudentModule } from 'entities/studentDegrees/StudentModule.Entity';

export class CreateStudentsGrades extends CustomSeederWithTimer {
    public async seed(dataSource: DataSource): Promise<void> {
        const gradeFactory = new GradeFactory();

        const allStudents = await dataSource.getRepository(Student).find();
        const subjects = await dataSource.getRepository(Subject).find();

        const studentsWithGrades = await dataSource.getRepository(Grade).find({ relations: ['student', 'subject'] });
        const assignedGradesIds = new Set<string>(studentsWithGrades.map((grade) => `${grade.student.id}_${grade.subject.id}`));

        if (allStudents.length === 0 || subjects.length === 0) {
            console.warn('No students or subjects found. Exiting seeder.');
            return;
        }

        for (let i = 0; i < AMOUNT_OF_CREATED_GRADES; i += BATCH_SIZE) {
            const batchSize = Math.min(BATCH_SIZE, AMOUNT_OF_CREATED_GRADES - i);
            try {
                await dataSource.transaction(async (transactionalEntityManager) => {
                    for (let j = 0; j < batchSize; j++) {
                        const student = faker.helpers.arrayElement(allStudents.filter((s) => !assignedGradesIds.has(String(s.id))));

                        const degreeCourses = await dataSource
                            .getRepository(StudentDegreeCourse)
                            .find({ where: { student: student }, relations: ['degreeCourse', 'degreeCourse.subjects'] });
                        const studentModules = await dataSource
                            .getRepository(StudentModule)
                            .find({ where: { student: student }, relations: ['module', 'module.subjects'] });

                        const enrolledSubjects = new Set<Subject>();

                        degreeCourses.forEach((degreeCourse) => {
                            degreeCourse.degreeCourse.subjects.forEach((subject) => enrolledSubjects.add(subject));
                        });

                        studentModules.forEach((studentModule) => {
                            studentModule.module.subjects.forEach((subject) => enrolledSubjects.add(subject));
                        });

                        const availableSubjects = Array.from(enrolledSubjects).filter((subject) => !assignedGradesIds.has(`${student.id}_${subject.id}`));

                        if (availableSubjects.length === 0) {
                            continue;
                        }

                        const subject = faker.helpers.arrayElement(availableSubjects);
                        const grade = gradeFactory.create(student, subject);

                        await transactionalEntityManager.save(grade);
                        assignedGradesIds.add(`${student.id}_${subject.id}`);
                    }
                });
            } catch (error) {
                console.error(`Error processing batch starting at grade ${i}:`, error);
            }
        }
    }
}
