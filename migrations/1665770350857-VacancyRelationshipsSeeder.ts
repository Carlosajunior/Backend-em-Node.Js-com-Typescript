import { MigrationInterface, QueryRunner } from 'typeorm';

export class VacancyRelationshipsSeeder1665770350857
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'UPDATE vacancies v SET contact_id = (SELECT vc.contact_id FROM vacancies_contacts vc WHERE v.id = vc.vacancy_id LIMIT 1) WHERE v.contact_id IS NULL'
    );

    await queryRunner.query(
      'UPDATE vacancies v SET customer_id = (SELECT vc.customer_id FROM vacancies_customers vc WHERE v.id = vc.vacancy_id LIMIT 1) WHERE v.customer_id IS NULL'
    );

    await queryRunner.query(
      "update vacancies v set created_by = replace(created_by, 'Usuario', 'Usuário') where created_by like '%Usuario%'"
    );

    await queryRunner.query(
      "update vacancies v set commercial_id = (select u.id from users u where v.created_by = concat(u.name , ' ', u.middle_name)  limit 1) where v.commercial_id is null"
    );

    await queryRunner.query(
      "update vacancies v set recruiter_id = (select u.id from users u where v.recruiter = concat(u.name , ' ', u.middle_name)  limit 1) where v.recruiter_id is null"
    );

    await queryRunner.query(
      'update vacancies v set funnel_id = (select vf.funnel_id from vacancies_funnels vf where v.id = vf.vacancy_id limit 1) where v.funnel_id is null'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
