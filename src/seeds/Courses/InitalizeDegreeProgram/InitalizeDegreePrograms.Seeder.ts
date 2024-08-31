import { DataSource } from 'typeorm';
import { DataParser } from './DataParser.Seeder';
import { DataSaver } from './DataSaver.Seeder';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';

export class InitializeDegreeProgramsSeeder extends CustomSeederWithTimer {
    public async seed(dataSource: DataSource): Promise<void> {
        const dataParser = new DataParser();
        const parsedData = await dataParser.parseFiles();

        const dataSaver = new DataSaver(dataSource);
        await dataSaver.saveParsedData(parsedData);
    }
}
