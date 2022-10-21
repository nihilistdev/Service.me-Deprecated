import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTicketResolutions1666368758157 implements MigrationInterface {
    name = 'AddTicketResolutions1666368758157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_resolutions" ADD CONSTRAINT "FK_15a380c71fb7affe74eead88c64" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ticket_resolutions" ADD CONSTRAINT "FK_aad3166ca65332e25c52ce65854" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_resolutions" DROP CONSTRAINT "FK_aad3166ca65332e25c52ce65854"`);
        await queryRunner.query(`ALTER TABLE "ticket_resolutions" DROP CONSTRAINT "FK_15a380c71fb7affe74eead88c64"`);
    }

}
