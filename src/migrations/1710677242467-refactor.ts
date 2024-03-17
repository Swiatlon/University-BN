import { MigrationInterface, QueryRunner } from 'typeorm';

export class Refactor1710677242467 implements MigrationInterface {
    name = 'Refactor1710677242467';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b17d821af8b4d6021462bfbe0f\` ON \`Students\``);
        await queryRunner.query(`DROP INDEX \`IDX_75d34d777e309e57f296add951\` ON \`Users_Accounts\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`login\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`login\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD UNIQUE INDEX \`IDX_75d34d777e309e57f296add951\` (\`login\`)`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`surname\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`surname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`date_of_birth\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`date_of_birth\` datetime NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_cc2749833d736efa8d49ce411a\` ON \`Students\``);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`pesel\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`pesel\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD UNIQUE INDEX \`IDX_cc2749833d736efa8d49ce411a\` (\`pesel\`)`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`gender\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`gender\` enum ('men', 'women') NOT NULL DEFAULT 'men'`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP INDEX \`IDX_cc2749833d736efa8d49ce411a\``);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`pesel\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`pesel\` char(11) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_cc2749833d736efa8d49ce411a\` ON \`Students\` (\`pesel\`)`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`date_of_birth\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`date_of_birth\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`surname\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`surname\` varchar(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`name\` varchar(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP INDEX \`IDX_75d34d777e309e57f296add951\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`login\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`login\` varchar(32) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_75d34d777e309e57f296add951\` ON \`Users_Accounts\` (\`login\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_b17d821af8b4d6021462bfbe0f\` ON \`Students\` (\`account_id\`)`);
    }
}
