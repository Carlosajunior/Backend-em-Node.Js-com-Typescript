import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddAdrressFKToProfile1669036164113 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('profile',
            new TableColumn({
                name: 'address_id',
                type: 'uuid',
                isNullable: true
            })
        )

        await queryRunner.createForeignKeys('profile', [
            new TableForeignKey({
                name: 'fk_profile_address',
                columnNames: ['address_id'],
                referencedTableName: 'address',
                referencedColumnNames: ['id']
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
