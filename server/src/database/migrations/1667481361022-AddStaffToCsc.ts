import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStaffToCsc1667481361022 implements MigrationInterface {
    name = 'AddStaffToCsc1667481361022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_in_service_center" ADD "staff_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer_in_service_center" ADD CONSTRAINT "FK_904b719bcc3dbda42374b347c6b" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_in_service_center" DROP CONSTRAINT "FK_904b719bcc3dbda42374b347c6b"`);
        await queryRunner.query(`ALTER TABLE "customer_in_service_center" DROP COLUMN "staff_id"`);
    }

}
