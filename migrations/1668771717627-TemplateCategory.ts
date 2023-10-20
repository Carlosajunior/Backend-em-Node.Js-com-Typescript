import { TemplateStatus } from '@/modules/templates/constants/template-status.constant';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class TemplateCategory1668771717627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'template_categories',
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
            name: 'name',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'status',
            isNullable: true,
            type: 'enum',
            enum: [
              TemplateStatus.ACTIVE,
              TemplateStatus.DELETED,
              TemplateStatus.INACTIVE
            ]
          }
        ]
      })
    );

    await queryRunner.addColumn(
      'template',
      new TableColumn({
        name: 'category_id',
        isNullable: true,
        type: 'uuid'
      })
    );

    await queryRunner.createForeignKey(
      'template',
      new TableForeignKey({
        name: 'fk_template_catergory',
        columnNames: ['category_id'],
        referencedTableName: 'template_categories',
        referencedColumnNames: ['id']
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE template DROP COLUMN category_id');
  }
}
