import { ExecutionTime } from '@/modules/offer-letters/constants/execution-time.constant';
import { TypeOfContract } from '@/modules/offer-letters/constants/type-of-contract.constant';
import { WorkModel } from '@/modules/vacancies/constants/work-model.constant';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class OfferLetter1668003113054 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'offer_letters',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isGenerated: true,
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'now()'
          },
          {
            name: 'area',
            type: 'varchar'
          },
          {
            name: 'execution_time',
            type: 'enum',
            isNullable: true,
            enum: [ExecutionTime.APPOINTED_HOURS, ExecutionTime.BUSINESS_HOURS]
          },
          {
            name: 'has_provisional_equipment_to_start',
            type: 'boolean'
          },
          {
            name: 'manager',
            type: 'varchar'
          },
          {
            name: 'mentor',
            isNullable: true,
            type: 'varchar'
          },
          {
            name: 'role',
            type: 'varchar'
          },
          {
            name: 'salary_clt',
            type: 'numeric',
            precision: 15,
            scale: 2,
            default: 0,
            isNullable: true
          },
          {
            name: 'send_equipment',
            type: 'boolean'
          },
          {
            name: 'start_date',
            type: 'timestamp'
          },
          {
            name: 't_shirt_size',
            type: 'varchar'
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
            name: 'type_of_contract',
            type: 'enum',
            enum: [TypeOfContract.CLT, TypeOfContract.COOP, TypeOfContract.PJ]
          },
          {
            name: 'work_model',
            type: 'enum',
            enum: [WorkModel.HYBRID, WorkModel.PRESENTIAL, WorkModel.REMOTE]
          },
          {
            name: 'work_schedule_from',
            type: 'integer',
            isNullable: true
          },
          {
            name: 'work_schedule_to',
            type: 'integer',
            isNullable: true
          },
          {
            name: 'vacancy_id',
            type: 'integer'
          },
          { name: 'offer_letter_template_id', type: 'uuid' }
        ],
        foreignKeys: [
          {
            name: 'fk_offer_letters_template',
            columnNames: ['offer_letter_template_id'],
            referencedTableName: 'offer_letters_templates',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          },
          {
            name: 'fk_offer_letters_vacancy',
            columnNames: ['vacancy_id'],
            referencedTableName: 'vacancies',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('offer_letters');
  }
}
