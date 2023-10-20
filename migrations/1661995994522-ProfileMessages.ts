import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProfileMessages1661995994522 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "profiles_messages",
                columns: [
                    {
                        name: 'message_id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: 'profile_id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false
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
        await queryRunner.dropTable("profiles_messages")
    }

}
