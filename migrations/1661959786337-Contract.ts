import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Contract1661959786337 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "contract",
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
                        name: "contract_link",
                        type: "varchar"
                    },
                    {
                        name: "expiration_date",
                        type: "Date"
                    },
                    {
                        name: "customer_id",
                        type: "uuid"
                    },
                    {
                        name: "obervations",
                        type: "varchar"
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
                        name: "fk_conract_customer",
                        columnNames: ["customer_id"],
                        referencedTableName: "customer",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("contract")
    }

}
