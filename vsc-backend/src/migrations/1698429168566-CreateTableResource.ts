import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableResource1698429168566 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "resource" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "resourceName" text NOT NULL, "bucket" text NOT NULL, "path" text NOT NULL, "filename" text NOT NULL, "applicationId" uuid NOT NULL, "priority" integer, "section" text NOT NULL, CONSTRAINT "resource_pkey" PRIMARY KEY ("id"), CONSTRAINT fk_resource_application FOREIGN KEY("applicationId") REFERENCES application(id))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "resource"`);
  }
}
