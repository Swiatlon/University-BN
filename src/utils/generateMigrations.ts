import { execSync } from 'child_process';

const ARGV_ARGUMENT_INDEX = 2;
const name = process.argv[ARGV_ARGUMENT_INDEX] || 'default_migration_name';

const command = `typeorm-ts-node-commonjs migration:generate src/migrations/${name} -d src/configs/database.ts`;

try {
    execSync(command, { stdio: 'inherit' });
    console.log('Migration generated successfully');
} catch (error) {
    console.error('Error generating migration:', error);
}
