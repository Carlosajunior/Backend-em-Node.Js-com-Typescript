import { VacancyService } from '@/modules/vacancies/constants/vacancy-service.constants';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Vacancies1661975976022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vacancies',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'desc',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'requirements',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'desirable',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'advantages',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'create_at',
            type: 'date'
          },
          {
            name: 'expire_at',
            type: 'date'
          },
          {
            name: 'work_model',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'experience',
            type: 'varchar'
          },
          {
            name: 'identify',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'project_time',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'contract_model',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'time_sale_value',
            type: 'numeric',
            precision: 15,
            scale: 2,
            default: 0,
            isNullable: true
          },
          {
            name: 'time_purchase',
            type: 'numeric',
            precision: 15,
            scale: 2,
            default: 0,
            isNullable: true
          },
          {
            name: 'complement_values',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'time_sale_value_pj',
            type: 'numeric',
            precision: 15,
            scale: 2,
            default: 0,
            isNullable: true
          },
          {
            name: 'time_purchase_pj',
            type: 'numeric',
            precision: 15,
            scale: 2,
            default: 0,
            isNullable: true
          },
          {
            name: 'complement_values_pj',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'time_sale_value_clt',
            type: 'numeric',
            precision: 15,
            scale: 2,
            default: 0,
            isNullable: true
          },
          {
            name: 'time_purchase_clt',
            type: 'numeric',
            precision: 15,
            scale: 2,
            default: 0,
            isNullable: true
          },
          {
            name: 'complement_values_clt',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'client',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'status',
            type: 'varchar'
          },
          {
            name: 'created_by',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'username_id',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'service',
            type: 'enum',
            enum: [VacancyService.Allocation, VacancyService.Hunting],
            isNullable: true
          },
          {
            name: 'status_comments',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'qtd_apply',
            type: 'integer',
            isNullable: true
          },
          {
            name: 'category_id',
            type: 'integer'
          },
          {
            name: 'service_type',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'conferred',
            type: 'boolean',
            default: false
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
            name: 'fk_vacancies_categories',
            columnNames: ['category_id'],
            referencedTableName: 'categories',
            referencedColumnNames: ['id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vacancies');
  }
}
