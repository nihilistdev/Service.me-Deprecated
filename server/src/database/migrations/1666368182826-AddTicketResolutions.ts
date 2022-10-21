import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTicketResolutions1666368182826 implements MigrationInterface {
    name = 'AddTicketResolutions1666368182826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."country_document_weights_idx"`);
        await queryRunner.query(`DROP INDEX "public"."city_document_weights_idx"`);
        await queryRunner.query(`DROP INDEX "public"."ticket_document_weights_idx"`);
        await queryRunner.query(`DROP INDEX "public"."document_weights_idx"`);
        await queryRunner.query(`DROP INDEX "public"."customers_document_weights_idx"`);
        await queryRunner.query(`CREATE TABLE "ticket_resolutions" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "ticket_id" integer NOT NULL, "staff_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at_l" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8d660124143985f4c7944c2ae23" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ticket_resolutions"`);
        await queryRunner.query(`CREATE INDEX "customers_document_weights_idx" ON "customers" ("document_with_weights") `);
        await queryRunner.query(`CREATE INDEX "document_weights_idx" ON "customers" ("document_with_weights") `);
        await queryRunner.query(`CREATE INDEX "ticket_document_weights_idx" ON "ticket" ("document_with_weights") `);
        await queryRunner.query(`CREATE INDEX "city_document_weights_idx" ON "city" ("document_with_weights") `);
        await queryRunner.query(`CREATE INDEX "country_document_weights_idx" ON "country" ("document_with_weights") `);
    }

}
