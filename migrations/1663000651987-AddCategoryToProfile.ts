import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCategoryToProfile1663000651987 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("profile", new TableColumn({
            name: "category_id",
            type: "integer",
            isNullable: true
        }))
        await queryRunner.createForeignKey("profile", new TableForeignKey({
            name: "fk_profile_category",
            columnNames: ["category_id"],
            referencedTableName: "categories",
            referencedColumnNames: ["id"]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
