import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultMigrationName1710444097513 implements MigrationInterface {
    name = 'DefaultMigrationName1710444097513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Students\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(128) NOT NULL, \`surname\` varchar(122) NOT NULL, \`dateOfBirth\` date NOT NULL, \`pesel\` char(11) NOT NULL, \`gender\` enum ('men', 'women') NOT NULL DEFAULT 'men', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_cc2749833d736efa8d49ce411a\` (\`pesel\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_cc2749833d736efa8d49ce411a\` ON \`Students\``);
        await queryRunner.query(`DROP TABLE \`Students\``);
    }

}
