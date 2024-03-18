import { MigrationInterface, QueryRunner } from 'typeorm';

export class ActivationDate1710787426979 implements MigrationInterface {
    name = 'ActivationDate1710787426979';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`deactivation_date\` datetime NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_75d34d777e309e57f296add951\` ON \`Users_Accounts\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`login\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`login\` varchar(111) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD UNIQUE INDEX \`IDX_75d34d777e309e57f296add951\` (\`login\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP INDEX \`IDX_75d34d777e309e57f296add951\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`login\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`login\` varchar(16) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_75d34d777e309e57f296add951\` ON \`Users_Accounts\` (\`login\`)`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`deactivation_date\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`isActive\` tinyint NOT NULL DEFAULT '1'`);
    }
}
