import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationWithDRY1710448681214 implements MigrationInterface {
    name = 'RelationWithDRY1710448681214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b17d821af8b4d6021462bfbe0f\` ON \`Students\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`state\``);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`dateOfBirth\``);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`date_of_birth\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP FOREIGN KEY \`FK_b17d821af8b4d6021462bfbe0f7\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD UNIQUE INDEX \`IDX_75d34d777e309e57f296add951\` (\`login\`)`);
        await queryRunner.query(`ALTER TABLE \`Students\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`surname\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`surname\` varchar(128) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`REL_b17d821af8b4d6021462bfbe0f\` ON \`Students\``);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`account_id\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`account_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD UNIQUE INDEX \`IDX_b17d821af8b4d6021462bfbe0f\` (\`account_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b17d821af8b4d6021462bfbe0f\` ON \`Students\` (\`account_id\`)`);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD CONSTRAINT \`FK_b17d821af8b4d6021462bfbe0f7\` FOREIGN KEY (\`account_id\`) REFERENCES \`Users_Accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Students\` DROP FOREIGN KEY \`FK_b17d821af8b4d6021462bfbe0f7\``);
        await queryRunner.query(`DROP INDEX \`REL_b17d821af8b4d6021462bfbe0f\` ON \`Students\``);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP INDEX \`IDX_b17d821af8b4d6021462bfbe0f\``);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`account_id\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`account_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b17d821af8b4d6021462bfbe0f\` ON \`Students\` (\`account_id\`)`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`surname\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`surname\` varchar(122) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`Students\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP INDEX \`IDX_75d34d777e309e57f296add951\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD CONSTRAINT \`FK_b17d821af8b4d6021462bfbe0f7\` FOREIGN KEY (\`account_id\`) REFERENCES \`Users_Accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Students\` DROP COLUMN \`date_of_birth\``);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`dateOfBirth\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Students\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Users_Accounts\` ADD \`state\` enum ('0', '1') NOT NULL DEFAULT '1'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_b17d821af8b4d6021462bfbe0f\` ON \`Students\` (\`account_id\`)`);
    }

}
