import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterColumnCategoryIdTaskTableRemoveNotNull1696621889256 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE tasks ALTER COLUMN category_id DROP NOT NULL');

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE tasks ALTER COLUMN category_id SET NOT NULL');

    }

}
