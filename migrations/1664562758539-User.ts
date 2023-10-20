import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1664562758539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            default: 'now()'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'middle_name',
            type: 'varchar'
          },
          { name: 'position', type: 'varchar' },
          { name: 'email_signature', type: 'varchar', isNullable: true },
          { name: 'whatsapp_business', type: 'varchar' },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'access_profile',
            type: 'enum',
            enum: [
              AccessProfiles.ADMINISTRATIVE,
              AccessProfiles.ADMINISTRATOR,
              AccessProfiles.COMMERCIAL,
              AccessProfiles.COMMERCIAL_MANAGEMENT,
              AccessProfiles.RECRUITER,
              AccessProfiles.RECRUITMENT_MANAGEMENT
            ]
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true
          },
          {
            name: 'squad_id',
            type: 'uuid',
            isNullable: true
          }
        ],
        foreignKeys: [
          {
            name: 'fk_user_squad',
            columnNames: ['squad_id'],
            referencedTableName: 'squads',
            referencedColumnNames: ['id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
