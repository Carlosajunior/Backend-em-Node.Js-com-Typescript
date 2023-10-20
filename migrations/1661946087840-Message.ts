import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Message1661946087840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "message",
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
                        name: "types",
                        type: "text[]",
                        isNullable: true
                    },
                    {
                        name: "sender_name",
                        type: "varchar"
                    },
                    {
                        name: "sender_email",
                        type: "varchar"
                    },
                    {
                        name: "sms_content",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "email_content",
                        type: "varchar",
                        isNullable: true
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
        await queryRunner.dropTable("message")
    }

}
