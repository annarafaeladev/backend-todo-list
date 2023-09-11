import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTasksTable1693951636255 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tasks',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    generationStrategy: "increment"
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


        // await queryRunner.query(
        //     `CREATE TABLE tarefa (
        //         id int NOT NULL, 
        //         titulo varchar(100) NOT NULL, 
        //         descricao varchar(255) NULL,
        //         concluida boolean NOT NULL DEFAULT false,
        //         updated_at timestamp NOT NULL DEFAULT now(),
        //         created_at timestamp NOT NULL DEFAULT now(),
        //         usuario_id int NOT NULL, 
        //         PRIMARY KEY (id),
        //         FOREIGN KEY (usuario_id) REFERENCES usuario(id)
        //     )`
        // );
        // await queryRunner.query(`
        //     CREATE TABLE tarefa_subtarefa (
        //         id INT NOT NULL,
        //         tarefa_id INT NOT NULL,
        //         subtarefa_id INT NOT NULL,
        //         updated_at timestamp NOT NULL DEFAULT now(),
        //         created_at timestamp NOT NULL DEFAULT now(),
        //         PRIMARY KEY (id),
        //         FOREIGN KEY (tarefa_id) REFERENCES tarefa(id),
        //         FOREIGN KEY (subtarefa_id) REFERENCES tarefa(id)
        //     )`
        // );


    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropTable('tarefa_subtarefa');
        await queryRunner.dropForeignKey("tasks", "user_id")
        await queryRunner.dropForeignKey("tasks", "category_id")
        await queryRunner.dropTable('tasks');
    }
}
