import { TemplateStatus } from '@/modules/offer-letters/constants/template-status.constant';
import { TypeOfContract } from '@/modules/offer-letters/constants/type-of-contract.constant';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class OfferLetterTemplate1667916285478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'offer_letters_templates',
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
            name: 'status',
            type: 'enum',
            enum: [
              TemplateStatus.ACTIVE,
              TemplateStatus.DELETED,
              TemplateStatus.INACTIVE
            ],
            enumName: 'offer_letters_templates_status'
          },
          {
            name: 'text',
            type: 'text'
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'type_of_contract',
            type: 'enum',
            enum: [TypeOfContract.CLT, TypeOfContract.COOP, TypeOfContract.PJ],
            enumName: 'offer_letters_templates_type_of_contract'
          },
          { name: 'user_id', type: 'uuid' }
        ],
        foreignKeys: [
          {
            name: 'fk_offer_letters_template_user_creator',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('offer_letters_templates');
  }
}
