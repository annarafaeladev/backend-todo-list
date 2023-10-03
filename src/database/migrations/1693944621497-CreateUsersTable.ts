import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1693944621497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "username",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true,
                        length: "50"
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false,
                        length: "255"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                        length: "255"
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
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
