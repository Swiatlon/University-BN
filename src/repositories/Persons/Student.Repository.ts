import { AppDataSource } from '../../configs/database';
import { DataSource } from 'typeorm';
import { IsNull } from 'typeorm';
import { getSelectFieldsFromContext } from 'middlewares/visibilityFieldsFilters';
import { Student } from 'entities/Students/Student.Entity';
import { IUserAllData } from 'interfaces/Accounts/IAccounts';
import { IAddress, IConsent } from 'interfaces/Persons/IPersons';

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
