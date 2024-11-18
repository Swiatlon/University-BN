import { DataSource } from 'typeorm';
import { DataParser } from './DataParser.Seeder';
import { DataSaver } from './DataSaver.Seeder';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';
import { DegreeCoursesRepository } from 'repositories/degreeCourses/DegreeCourses.Repository';

export class InitializeDegreePrograms extends CustomSeederWithTimer {
    protected async beforeSeed(): Promise<boolean> {
        const existingRoleCount = await DegreeCoursesRepository().getDegreeCoursesAmount();
        return existingRoleCount === 0;
    }

    public async seed(dataSource: DataSource): Promise<void> {
        const dataParser = new DataParser();
        const dataSaver = new DataSaver(dataSource);

        const parsedData = await dataParser.parseFiles();
        await dataSaver.saveParsedData(parsedData);
    }
}
