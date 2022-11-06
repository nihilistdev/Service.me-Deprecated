import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCustomerView1667722116294 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            create or replace
            view v_customer_in_sc as
            select
                c.id
                ,
                c.first_name
                ,
                c.last_name 
                ,
                c.email 
                ,
                c.phone 
                ,
                c.address 
                ,
                c.pin
            from
                customer_in_service_center cisc
            left join customers c 
            on
                c.id = cisc.customers_id
            left join service_center sc 
            on
                sc.sc_id = cisc.service_centers_sc_id
            ;
    `
    );
  }

  public async down(): Promise<void> {}
}
