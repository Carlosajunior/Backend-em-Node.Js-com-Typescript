import { MigrationInterface, QueryRunner } from "typeorm";

export class MoveAddressessFromProfileToAddress1669036213412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO address(city, state) SELECT DISTINCT city,state FROM profile WHERE city IS NOT NULL AND city NOT IN(SELECT city FROM address) AND state IS NOT NULL AND state NOT IN(SELECT state FROM address)")
        await queryRunner.query("UPDATE profile SET address_id = ad.id FROM address ad WHERE 1=1 AND ad.city = profile.city AND ad.state = profile.state")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }


}
