import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1686219818833 implements MigrationInterface {
    name = 'CreateTables1686219818833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pricing_package" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "packageName" text NOT NULL, "monthlyPrice" double precision NOT NULL, "annualPrice" double precision NOT NULL, CONSTRAINT "PK_12ad755907fe78cf221ae6f2b1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "pricingPackageId" uuid NOT NULL, "key" text NOT NULL, "monthly" boolean NOT NULL, "suspended" boolean NOT NULL DEFAULT false, "subscriptionDate" TIMESTAMP NOT NULL DEFAULT now(), "expirationDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" text NOT NULL, "lastname" text, "company" text, "email" text NOT NULL, "phone" text, "country" text, "hid" text, "updatePermission" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
        await queryRunner.query(`DROP TABLE "pricing_package"`);
    }

}
