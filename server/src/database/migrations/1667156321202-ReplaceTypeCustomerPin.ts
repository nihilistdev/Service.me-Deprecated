import {MigrationInterface, QueryRunner} from "typeorm";

export class ReplaceTypeCustomerPin1667156321202 implements MigrationInterface {
    name = 'ReplaceTypeCustomerPin1667156321202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "UQ_209084608020087371bad015e82"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "pin"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "pin" character varying`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "UQ_209084608020087371bad015e82" UNIQUE ("pin")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "UQ_209084608020087371bad015e82"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "pin"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "pin" bigint`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "UQ_209084608020087371bad015e82" UNIQUE ("pin")`);
    }

}
