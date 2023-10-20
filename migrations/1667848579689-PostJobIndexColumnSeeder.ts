import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostJobIndexColumnSeeder1667848579689
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'UPDATE post_job_interview pj SET index = pj.id - 1 where id is not null'
    );

    await queryRunner.query(
      "UPDATE post_job_interview pj SET index = pj.index + 1 where name = 'Carta oferta enviada' OR name = 'Contratado'"
    );

    await queryRunner.query(
      "INSERT INTO post_job_interview(name) values ('Dossiê')"
    );

    await queryRunner.query(
      "UPDATE post_job_interview pj SET index = ((SELECT pji.index FROM post_job_interview pji where pji.name = 'Carta oferta enviada' limit 1) - 1) WHERE pj.name = 'Dossiê'"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
