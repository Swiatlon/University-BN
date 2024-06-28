import { AppDataSource } from '../../configs/database';
import { DataSource, In, Not } from 'typeorm';
import { IsNull } from 'typeorm';
import { getSelectFieldsFromContext } from 'middlewares/visibilityFieldsFilters';
import { Student } from 'entities/Students/Student.Entity';
import { IUserAllData } from 'interfaces/Accounts/IAccounts';
import { IAddress, IConsent } from 'interfaces/Persons/IPersons';
import { StudentDegreeCourse } from 'entities/StudentDegrees/StudentDegreeCourse.Entity';
import { StudentWithDegreeCourse } from 'interfaces/StudentDegree/IStudentDegree';
export const StudentRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(Student).extend({
        async findStudentsWithoutAccount() {
            return this.findBy({
                accountId: IsNull(),
            });
        },

        async findStudentByAccountId(id: string) {
            return this.createQueryBuilder('student').where('student.accountId = :id', { id }).getOne();
        },

        async getStudentBasicData(id: string) {
            const selectFields = getSelectFieldsFromContext('student');

            return this.createQueryBuilder('student').select(selectFields).where('student.id = :id', { id }).getOne();
        },

        async getStudentsWithoutDegreeCourses() {
            const studentsWithDegreeCourses: StudentWithDegreeCourse[] = await dataSource
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
            return this.createQueryBuilder('Student')
                .innerJoinAndSelect('student.addressId', 'studentAddress', 'studentAddress.id = student.addressId')
                .innerJoinAndSelect(`student.consentId`, `studentConsent`, `studentConsent.id = student.consentId`)
                .where('student.id = :id', { id })
                .getOne()
                .then((student) => {
                    if (student) {
                        const studentAddress = { ...(student.addressId as unknown as IAddress) };
                        const studentConsent = { ...(student.consentId as unknown as IConsent) };
                        const userAllData: IUserAllData = {
                            ...student,
                            ...studentAddress,
                            ...studentConsent,
                            id: student.id,
                            addressId: studentAddress.id,
                            consentId: studentConsent.id,
                        };

                        return userAllData;
                    }
                    return null;
                });
        },
    });
};
