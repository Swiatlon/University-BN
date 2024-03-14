import { MigrationInterface, QueryRunner } from "typeorm";

export class StudentAccounts1710446218297 implements MigrationInterface {
    name = 'StudentAccounts1710446218297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Users_Accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`login\` varchar(32) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`state\` enum ('0', '1') NOT NULL DEFAULT '1', UNIQUE INDEX \`IDX_f803275cd5649d5be61fa24b2d\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`account_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD UNIQUE INDEX \`IDX_b17d821af8b4d6021462bfbe0f\` (\`account_id\`)`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b17d821af8b4d6021462bfbe0f\` ON \`Students\` (\`account_id\`)`);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD CONSTRAINT \`FK_b17d821af8b4d6021462bfbe0f7\` FOREIGN KEY (\`account_id\`) REFERENCES \`Users_Accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Students\` DROP FOREIGN KEY \`FK_b17d821af8b4d6021462bfbe0f7\``);
        await queryRunner.query(`DROP INDEX \`REL_b17d821af8b4d6021462bfbe0f\` ON \`Students\``);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP INDEX \`IDX_b17d821af8b4d6021462bfbe0f\``);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`account_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_f803275cd5649d5be61fa24b2d\` ON \`Users_Accounts\``);
        await queryRunner.query(`DROP TABLE \`Users_Accounts\``);
    }

}
