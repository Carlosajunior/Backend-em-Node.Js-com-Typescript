import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddActiveToProfile1675257052499 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('profile', new TableColumn({
            name: 'active',
            type: 'boolean',
            isNullable: false,
            default: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
