import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTasksTable1693951636255 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tasks',
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "user_id",
                    type: "int",
                    isNullable: false,
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

        await queryRunner.createForeignKey("tasks", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("tasks", new TableForeignKey({
            columnNames: ["category_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "categories",
            onDelete: "CASCADE",
        }));


    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("tasks", "user_id")
        await queryRunner.dropForeignKey("tasks", "category_id")
        await queryRunner.dropTable('tasks');
    }
}
