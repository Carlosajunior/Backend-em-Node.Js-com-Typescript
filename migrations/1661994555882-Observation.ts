import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Observation1661994555882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'observation',
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
            name: 'note',
            type: 'varchar'
          },
          {
            name: 'contact_date',
            type: 'date',
            isNullable: true
          },
          {
            name: 'identify',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'vacancy_id',
            type: 'integer',
            isNullable: true
          },
          {
            name: 'profile_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'linked_by',
            type: 'varchar'
          },
          {
            name: 'columns_id',
            type: 'uuid',
            isNullable: true
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
            name: 'fk_observation_vacancy',
            columnNames: ['vacancy_id'],
            referencedTableName: 'vacancies',
            referencedColumnNames: ['id']
          },
          {
            name: 'fk_observation_profile',
            columnNames: ['profile_id'],
            referencedTableName: 'profile',
            referencedColumnNames: ['id']
          },
          {
            name: 'fk_observation_columns',
            columnNames: ['columns_id'],
            referencedTableName: 'columns',
            referencedColumnNames: ['id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('observation');
  }
}
