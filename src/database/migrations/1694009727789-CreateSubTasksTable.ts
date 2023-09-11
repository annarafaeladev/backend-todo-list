import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateSubTasksTable1694009727789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'sub_tasks',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    generationStrategy: "increment"
                },
                {
                    name: "task_id",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "category_id",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false,
                    length: "100"
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: false,
                    length: "255"
                },
                {
                    name: "done",
                    type: "boolean",
                    isNullable: false,
                    default: false
                },
                {
                    name: "severity",
                    type: "int",
                    isNullable: false,
                    default: 1
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                }
            ]
        }))

        await queryRunner.createForeignKey("sub_tasks", new TableForeignKey({
            columnNames: ["task_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "tasks",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("sub_tasks", new TableForeignKey({
            columnNames: ["category_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "categories",
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("sub_tasks", "category_id");
        await queryRunner.dropForeignKey("sub_tasks", "task_id");
        await queryRunner.dropTable("sub_tasks");
    }

}
