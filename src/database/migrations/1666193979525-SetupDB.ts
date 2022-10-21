import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupDB1666193979525 implements MigrationInterface {
  name = "SetupDB1666193795259";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "country" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "iso2" character varying NOT NULL, "iso3" character varying NOT NULL, "document_with_weights" tsvector, CONSTRAINT "UQ_2c5aa339240c0c3ae97fcc9dc4c" UNIQUE ("name"), CONSTRAINT "UQ_b49a3cfa4a8ab50b388f893cd4c" UNIQUE ("iso2"), CONSTRAINT "UQ_8df5b1a0131e8e155381547aa5b" UNIQUE ("iso3"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "city" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "postal_code" integer, "country_name" character varying, "document_with_weights" tsvector, "country_id" integer, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "staff_roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_87101d9c9d1604a36152cfad1c5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "confirmed" boolean DEFAULT false, "is_active" boolean DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "staff" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "sc_sc_id" integer NOT NULL, "roles_id" integer NOT NULL, "deleted_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "service_center" ("sc_id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "city_id" integer, "phone" character varying NOT NULL, "logo" character varying, "id_number" character varying, "owner_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_292e5048551ccec7af692b424de" PRIMARY KEY ("sc_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "ticket_status" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_a39055e902c270197f3711e0ee3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "sc_sc_id" integer NOT NULL, "customer_id" integer NOT NULL, "staff_id" integer NOT NULL, "document_with_weights" tsvector, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ticket_status_id" integer, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "pin" bigint, "phone" character varying NOT NULL, "address" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "document_with_weights" tsvector, CONSTRAINT "UQ_209084608020087371bad015e82" UNIQUE ("pin"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "customer_in_service_center" ("customers_id" integer NOT NULL, "service_centers_sc_id" integer NOT NULL, CONSTRAINT "PK_ea9f709e80fd9b8bc34c1227a59" PRIMARY KEY ("customers_id", "service_centers_sc_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "api_keys" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "key" character varying NOT NULL, "user_api_key_id" integer, CONSTRAINT "PK_5c8a79801b44bd27b79228e1dad" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "city" ADD CONSTRAINT "FK_08af2eeb576770524fa05e26f39" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_cec9365d9fc3a3409158b645f2e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_ffe670abb906383ed862749becd" FOREIGN KEY ("sc_sc_id") REFERENCES "service_center"("sc_id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_87101d9c9d1604a36152cfad1c5" FOREIGN KEY ("roles_id") REFERENCES "staff_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "service_center" ADD CONSTRAINT "FK_f040adbaa5a91650a62ca1b661c" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "service_center" ADD CONSTRAINT "FK_07957a10c32635540bf9704daf5" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_395a7d2f7517acbff14ff6e7a3c" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_9a40df465b0e9ef73b469fb289d" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_6e661771d13fc4a35c8cd75d937" FOREIGN KEY ("sc_sc_id") REFERENCES "service_center"("sc_id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_fb8cfed6ca31a60f756e759c8a5" FOREIGN KEY ("ticket_status_id") REFERENCES "ticket_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "customer_in_service_center" ADD CONSTRAINT "FK_6d12690bef4596bc367ce26353e" FOREIGN KEY ("customers_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "customer_in_service_center" ADD CONSTRAINT "FK_5f9a2b24910c89e2c7cec1219c5" FOREIGN KEY ("service_centers_sc_id") REFERENCES "service_center"("sc_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "api_keys" ADD CONSTRAINT "FK_ae30b26747dbd064c9ed9e2dad1" FOREIGN KEY ("user_api_key_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "api_keys" DROP CONSTRAINT "FK_ae30b26747dbd064c9ed9e2dad1"`
    );
    await queryRunner.query(
      `ALTER TABLE "customer_in_service_center" DROP CONSTRAINT "FK_5f9a2b24910c89e2c7cec1219c5"`
    );
    await queryRunner.query(
      `ALTER TABLE "customer_in_service_center" DROP CONSTRAINT "FK_6d12690bef4596bc367ce26353e"`
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_fb8cfed6ca31a60f756e759c8a5"`
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_6e661771d13fc4a35c8cd75d937"`
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_9a40df465b0e9ef73b469fb289d"`
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_395a7d2f7517acbff14ff6e7a3c"`
    );
    await queryRunner.query(
      `ALTER TABLE "service_center" DROP CONSTRAINT "FK_07957a10c32635540bf9704daf5"`
    );
    await queryRunner.query(
      `ALTER TABLE "service_center" DROP CONSTRAINT "FK_f040adbaa5a91650a62ca1b661c"`
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_87101d9c9d1604a36152cfad1c5"`
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_ffe670abb906383ed862749becd"`
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_cec9365d9fc3a3409158b645f2e"`
    );
    await queryRunner.query(
      `ALTER TABLE "city" DROP CONSTRAINT "FK_08af2eeb576770524fa05e26f39"`
    );
    await queryRunner.query(`DROP TABLE "api_keys"`);
    await queryRunner.query(`DROP TABLE "customer_in_service_center"`);
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TABLE "ticket"`);
    await queryRunner.query(`DROP TABLE "ticket_status"`);
    await queryRunner.query(`DROP TABLE "service_center"`);
    await queryRunner.query(`DROP TABLE "staff"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "staff_roles"`);
    await queryRunner.query(`DROP TABLE "city"`);
    await queryRunner.query(`DROP TABLE "country"`);
  }
}
