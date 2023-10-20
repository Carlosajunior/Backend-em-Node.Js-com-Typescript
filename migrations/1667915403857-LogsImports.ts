import { ImportsEnum } from "@/modules/logs-imports/constants/import.constants";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class LogsImports1667915403857 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "logs_imports",
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
                        name: "link_linkedin",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: [ImportsEnum.error, ImportsEnum.pending, ImportsEnum.success]
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
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('logs_imports')
    }

}
