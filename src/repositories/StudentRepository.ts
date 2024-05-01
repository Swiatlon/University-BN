import { AppDataSource } from '../configs/database';
import { DataSource } from 'typeorm';
import { Student } from 'entities/StudentEntity';
import { IsNull } from 'typeorm';
import { getSelectFieldsFromContext } from 'middlewares/visibilityFieldsFilters';
import { IUserAllData } from 'interfaces/IUserAccount';
import { IAddress } from 'interfaces/IAddress';

export const studentRepository = (customDataSource: DataSource = AppDataSource) => {
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
                .where('student.id = :id', { id })
                .getOne()
                .then((student) => {
                    if (student) {
                        const studentAddress = { ...(student.addressId as unknown as IAddress) };
                        const userAllData: IUserAllData = {
                            ...student,
                            ...studentAddress,
                            id: student.id,
                            addressId: studentAddress.id as string,
                        };

                        return userAllData;
                    }
                    return null;
                });
        },
    });
};
