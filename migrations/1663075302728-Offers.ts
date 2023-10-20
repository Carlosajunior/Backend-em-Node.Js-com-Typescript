import { VacancyService } from '@/modules/vacancies/constants/vacancy-service.constants';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Offers1663075302728 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'offers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'commercial_name',
            type: 'varchar'
          },
          {
            name: 'recruiter_name',
            type: 'varchar'
          },
          { name: 'remuneration', type: 'numeric', precision: 15, scale: 2 },
          {
            name: 'start_date',
            type: 'timestamp'
          },
          {
            name: 'type_of_contract',
            type: 'enum',
            enum: [VacancyService.Allocation, VacancyService.Hunting]
          },
          {
            name: 'customer_contact_id',
            isNullable: true,
            type: 'uuid'
          },
          {
            name: 'professional_profile_id',
            type: 'uuid'
          },
          {
            name: 'vacancy_id',
            type: 'integer'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'fk_offers_customer_contact',
            columnNames: ['customer_contact_id'],
            referencedTableName: 'contact',
            referencedColumnNames: ['id']
          },
          {
            name: 'fk_offers_professional_profile',
            columnNames: ['professional_profile_id'],
            referencedTableName: 'profile',
            referencedColumnNames: ['id']
          },
          {
            name: 'fk_offers_vacancy',
            columnNames: ['vacancy_id'],
            referencedTableName: 'vacancies',
            referencedColumnNames: ['id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('offers');
  }
}
