import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableApplication1696689348692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "applicationName" text NOT NULL, "bucket" text NOT NULL, "path" text NOT NULL, "filename" text NOT NULL, CONSTRAINT "application_pkey" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricing_package" ADD COLUMN "applicationId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ALTER COLUMN "userId" TYPE uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ALTER COLUMN "pricingPackageId" TYPE uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricing_package" ADD CONSTRAINT fk_pricing_package_application FOREIGN KEY("applicationId") REFERENCES application(id)`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT fk_subscription_user FOREIGN KEY("userId") REFERENCES "user"(id)`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT fk_subscription_pricing_package FOREIGN KEY("pricingPackageId") REFERENCES pricing_package(id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT fk_subscription_pricing_package`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT fk_subscription_user`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricing_package" DROP CONSTRAINT fk_pricing_package_application`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ALTER COLUMN "pricingPackageId" TYPE text`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ALTER COLUMN "userId" TYPE text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricing_package" DROP COLUMN "applicationId"`,
    );
    await queryRunner.query(`DROP TABLE "application"`);
  }
}
