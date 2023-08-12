import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAuthentication1690479228870
  implements MigrationInterface
{
  name = 'CreateTableAuthentication1690479228870';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "authentication" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "authentication_pkey" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "authentication"`);
  }
}
