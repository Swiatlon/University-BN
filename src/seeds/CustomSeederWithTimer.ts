import { ONE_SECOND_IN_MILISECONDS } from 'constants/general/general.Constants';
import { DataSource, EntityManager } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export abstract class CustomSeederWithTimer implements Seeder {
    protected abstract seed(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>;

    protected async beforeSeed(_dataSource: DataSource): Promise<boolean> {
        return true;
    }

    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const startTime = Date.now();
        console.log(`Starting seeder: ${this.constructor.name}`);

        const shouldSeed = await this.beforeSeed(dataSource);
        if (!shouldSeed) {
            console.log(`Skipping seeder: ${this.constructor.name} as data already exists.\n`);
            return;
        }

        await this.seed(dataSource, factoryManager);

        const endTime = Date.now();
        const duration = (endTime - startTime) / ONE_SECOND_IN_MILISECONDS;
        console.log(`Finished seeder: ${this.constructor.name} in ${duration} seconds\n`);
    }

    public async runInTransaction(dataSource: DataSource, operation: (manager: EntityManager) => Promise<void>): Promise<void> {
        await dataSource.transaction(async (transactionalEntityManager) => {
            await operation(transactionalEntityManager);
        });
    }
}
