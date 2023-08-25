import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddActive1692983750912 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pricing_package" ADD COLUMN "active" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pricing_package" DROP COLUMN "active"`,
    );
  }
}
