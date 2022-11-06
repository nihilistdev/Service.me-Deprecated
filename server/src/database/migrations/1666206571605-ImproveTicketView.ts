import { MigrationInterface, QueryRunner } from "typeorm";

export class ImproveTicketView1666206571605 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create or replace view public.v_tickets as
        select t.id as ticket_id,
            t.title as ticket_title,
            t.description as ticket_description,
            sc.sc_id as service_center_id,
            sc.name as service_center_name,
            sc.address as service_center_address,
            sc.phone as service_center_phone,
            c.first_name as customer_first_name,
            c.last_name as customer_last_name,
            c.email as service_center_email,
            c.phone as customer_phone_number,
            u.first_name as staff_first_name,
            u.last_name as staff_last_name,
            u.email as staff_email,
            u.username as staff_username,
            ts.title as ticket_status
        from ticket t
            left join service_center sc on sc.sc_id = t.sc_sc_id
            left join customers c on c.id = t.customer_id
            left join staff s on s.id = t.staff_id
            left join "user" u on s.user_id = u.id
            left join public.ticket_status ts on ts.id = t.ticket_status_id;
        `);
  }

  public async down(): Promise<void> {}
}
