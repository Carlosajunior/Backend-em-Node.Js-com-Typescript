import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Template1661913397772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "template",
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
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "type",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "created_by",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "username_id",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "active",
                        type: "boolean",
                        isNullable: true,
                        default: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("template")
    }

}
