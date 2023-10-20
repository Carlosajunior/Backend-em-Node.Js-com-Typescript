import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Contact1661958661359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contact',
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
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '16',
            isNullable: true
          },
          {
            name: 'cellphone',
            type: 'varchar',
            length: '15',
            isNullable: true
          },
          {
            name: 'email',
            type: 'varchar',
            length: '70',
            isNullable: false
          },
          {
            name: 'role',
            type: 'varchar',
            length: '100',
            isNullable: false
          },
          {
            name: 'department',
            type: 'varchar',
            length: '100',
            isNullable: false
          },
          {
            name: 'customerId',
            type: 'uuid'
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
          },
          {
            name: 'is_admin',
            type: 'boolean',
            default: false
          }
        ],
        foreignKeys: [
          {
            name: 'fk_contact_customer',
            columnNames: ['customerId'],
            referencedTableName: 'customer',
            referencedColumnNames: ['id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contact');
  }
}
