import { AuditEvent, AuditModule } from "@/modules/audit/constants";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Audit1661884960494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
        await queryRunner.createTable(
            new Table({
                name: "audit",
                columns: [{
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: "event_type",
                    type: "enum",
                    enum: [AuditEvent.Access, AuditEvent.Delete, AuditEvent.Insert, AuditEvent.Login, AuditEvent.Update],
                    isNullable: false
                },
                {
                    name: "event_description",
                    type: "jsonb",
                    isNullable: false
                },
                {
                    name: "user_id",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "username",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "user_email",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "table_name",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "entity_id",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "module",
                    type: "enum",
                    enum: [AuditModule.Customer, AuditModule.Funnel, AuditModule.Message, AuditModule.Professional, AuditModule.Vacancy],
                    isNullable: true
                },
                {
                    name: "old_value",
                    type: "jsonb",
                    isNullable: true
                },
                {
                    name: "new_value",
                    type: "jsonb",
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
        await queryRunner.dropTable("Audit")
    }

}
