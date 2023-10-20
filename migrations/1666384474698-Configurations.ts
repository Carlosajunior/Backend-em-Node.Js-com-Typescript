import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Configurations1666384474698 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'configurations',
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
                        name: "configuration_name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "configuration",
                        type: "varchar",
                        isNullable: false
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
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('configurations');
    }
}
