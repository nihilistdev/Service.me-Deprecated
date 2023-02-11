import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBasicRoles1666244566994 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            insert into public.staff_roles (name) values
            ('Technician')
            , ('Admin')
            , ('Manager')
        `);
  }

  public async down(): Promise<void> {}
}
