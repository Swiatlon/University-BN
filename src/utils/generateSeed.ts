import 'reflect-metadata';
import { AppDataSource } from 'configs/database';
import { runSeeders } from 'typeorm-extension';

async function seedDatabase() {
    try {
        await AppDataSource.initialize();
        console.log('Database connection established, running seeders...');
        await runSeeders(AppDataSource);
        console.log('Seeding complete!');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await AppDataSource.destroy();
        console.log('Database connection closed.');
    }
}

void seedDatabase().catch((error) => {
    console.error('Failed to seed database:', error);
});
