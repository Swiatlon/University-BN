import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { DataParser } from './DataParser';
import { DataSaver } from './DataSaver';

export class InitializeDegreeProgramsSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const dataParser = new DataParser();
        const parsedData = await dataParser.parseFiles();

        const dataSaver = new DataSaver(dataSource);
        await dataSaver.saveParsedData(parsedData);
    }
}
