import { ONE_SECOND_IN_MILISECONDS } from 'constants/general/general.Constants';
import { DataSource, EntityManager } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export abstract class CustomSeederWithTimer implements Seeder {
    abstract seed(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>;

    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const startTime = Date.now();
        console.log(`Starting seeder: ${this.constructor.name}`);

        await this.seed(dataSource, factoryManager);

        const endTime = Date.now();
        const duration = (endTime - startTime) / ONE_SECOND_IN_MILISECONDS;
        console.log(`Finished seeder: ${this.constructor.name} in ${duration} seconds \n`);
    }

    protected async runInTransaction(dataSource: DataSource, operation: (manager: EntityManager) => Promise<void>): Promise<void> {
        await dataSource.transaction(async (transactionalEntityManager) => {
            await operation(transactionalEntityManager);
        });
    }
}
