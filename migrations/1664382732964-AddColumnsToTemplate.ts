import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnsToTemplate1664382732964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "template" ADD COLUMN email_title varchar(100)`
    );

    await queryRunner.query(
      `ALTER TABLE "template" ADD COLUMN vacancy_url_text varchar(200)`
    );


    await queryRunner.query(
      `ALTER TABLE "template" ADD COLUMN whatsapp_text_of_recruiter varchar(200)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "template" DROP COLUMN email_title, vacancy_url_text, whatsapp_text_of_recruiter;`
    );
  }
}
