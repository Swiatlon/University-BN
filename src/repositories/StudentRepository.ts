import { AppDataSource } from '../configs/database';
import { DataSource } from 'typeorm';
import { Student } from 'entities/StudentEntity';
import { IsNull } from 'typeorm';

export const studentRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(Student).extend({
        findStudentsWithoutAccount() {
            return this.findBy({
                accountId: IsNull(),
            });
        },
    });
};
