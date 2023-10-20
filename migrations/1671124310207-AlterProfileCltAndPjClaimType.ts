import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterProfileCltAndPjClaimType1671124310207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE profile ALTER COLUMN clt_claim TYPE FLOAT USING (CASE WHEN clt_claim = '' THEN 0.0 WHEN clt_claim = 'null' THEN NULL ELSE clt_claim::float END);`)

        await queryRunner.query(`ALTER TABLE profile ALTER COLUMN pj_claim TYPE FLOAT USING (CASE WHEN pj_claim = '' THEN 0.0 WHEN PJ_claim = 'null' THEN NULL ELSE pj_claim::float END);`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
