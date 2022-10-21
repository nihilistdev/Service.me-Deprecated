import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTicketResolutions1666369251305 implements MigrationInterface {
    name = 'AddTicketResolutions1666369251305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_resolutions" RENAME COLUMN "updated_at_l" TO "updated_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_resolutions" RENAME COLUMN "updated_at" TO "updated_at_l"`);
    }

}
