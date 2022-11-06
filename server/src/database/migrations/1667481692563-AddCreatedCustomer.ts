import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedCustomer1667481692563 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create or replace
        view public.v_customer_created_by as
        select 
            u.first_name,
            u.last_name,
            u.username,
            u.email
        from
            customer_in_service_center cisc
        left join staff s 
        on
            s.id = cisc .staff_id
        left join public."user" u 
        on
            u.id = s.id;
        `);
  }

  public async down(): Promise<void> {}
}
