import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class CreateFkCategoriesTable1696614635657 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("categories", new TableColumn({
            name: "user_id",
            type: "int",
            isNullable: false,
        }));

        await queryRunner.createForeignKey("categories", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("categories", "user_id")
        await queryRunner.dropColumn("categories", "user_id");
    }

}
