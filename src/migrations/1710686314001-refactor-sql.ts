import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorSql1710686314001 implements MigrationInterface {
    name = 'RefactorSql1710686314001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_75d34d777e309e57f296add951\` ON \`Users_Accounts\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`login\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`login\` varchar(16) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD UNIQUE INDEX \`IDX_75d34d777e309e57f296add951\` (\`login\`)`);
        await queryRunner.query(`DROP INDEX \`IDX_f803275cd5649d5be61fa24b2d\` ON \`Users_Accounts\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`email\` varchar(320) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD UNIQUE INDEX \`IDX_f803275cd5649d5be61fa24b2d\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`password\` varchar(72) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`name\` varchar(55) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`surname\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`surname\` varchar(55) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_cc2749833d736efa8d49ce411a\` ON \`Students\``);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`pesel\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`pesel\` varchar(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD UNIQUE INDEX \`IDX_cc2749833d736efa8d49ce411a\` (\`pesel\`)`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`gender\` enum ('Men', 'Women') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`gender\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP INDEX \`IDX_cc2749833d736efa8d49ce411a\``);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`pesel\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`pesel\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_cc2749833d736efa8d49ce411a\` ON \`Students\` (\`pesel\`)`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`surname\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`surname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP INDEX \`IDX_f803275cd5649d5be61fa24b2d\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_f803275cd5649d5be61fa24b2d\` ON \`Users_Accounts\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP INDEX \`IDX_75d34d777e309e57f296add951\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`login\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`login\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_75d34d777e309e57f296add951\` ON \`Users_Accounts\` (\`login\`)`);
    }
}