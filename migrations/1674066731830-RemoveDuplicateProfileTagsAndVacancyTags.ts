import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDuplicateProfileTagsAndVacancyTags1674066731830
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    await queryRunner.query(
      'ALTER TABLE vacancies_tags add column id uuid not null default uuid_generate_v4()'
    );

    await queryRunner.query(
      'DELETE FROM profiles_tags pta where exists (select 1 from profiles_tags ptb where pta.tag_id=ptb.tag_id and pta.profile_id=ptb.profile_id  AND pta.id < ptb.id)'
    );

    await queryRunner.query(
      'DELETE FROM vacancies_tags pta where exists (select 1 from vacancies_tags ptb where pta.tag_id=ptb.tag_id and pta.vacancy_id =ptb.vacancy_id  AND pta.id < ptb.id)'
    );

    await queryRunner.commitTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
  }
}
