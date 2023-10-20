import { AuditEvent, AuditModule } from "@/modules/audit/constants";
import { ProfileHistoryEvent } from "@/modules/professional-profiles/profile-history/constants";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProfileHistory1661912198829 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "profile_history",
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
                    enum: [ProfileHistoryEvent.Delete, ProfileHistoryEvent.Insert, ProfileHistoryEvent.Update, AuditEvent.Access, AuditEvent.Delete, AuditEvent.Insert, AuditEvent.Login, AuditEvent.Update]
                },
                {
                    name: "event_description",
                    type: "jsonb"
                },
                {
                    name: "user_id",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "username",
                    type: "varchar"
                },
                {
                    name: "user_email",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "table_name",
                    type: "varchar"
                },
                {
                    name: "entity_id",
                    type: "varchar"
                },
                {
                    name: "ip",
                    type: "varchar"
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
        await queryRunner.dropTable("profile_history")
    }

}
