import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPerpetualPrice1691828853404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pricing_package" ADD COLUMN "perpetualPrice" double precision NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ALTER COLUMN "expirationDate" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "monthly"`);
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD COLUMN "paymentPlan" text NOT NULL DEFAULT 'PERPETUAL'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP COLUMN "paymentPlan"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD COLUMN "monthly" boolean NOT NULL DEFAULT TRUE`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP COLUMN "expirationDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD COLUMN "expirationDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricing_package" DROP COLUMN "perpetualPrice"`,
    );
  }
}
