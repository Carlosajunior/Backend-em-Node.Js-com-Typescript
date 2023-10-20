import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Reference1661996569401 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "reference",
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
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "link",
                        type: "varchar"
                    },
                    {
                        name: "profile_id",
                        type: "uuid"
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
                ],
                foreignKeys: [
                    {
                        name: "fk_reference_profile",
                        columnNames: ["profile_id"],
                        referencedTableName: "profile",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("reference")
    }
}
