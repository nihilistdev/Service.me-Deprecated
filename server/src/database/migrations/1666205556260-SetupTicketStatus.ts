import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupTicketStatus1666205556260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            insert into public.ticket_status(title) 
            values ('In progress'), ('New'), ('Waiting for parts'), ('Closed'), ('Cannot resolve issue');
        `);
  }

  public async down(): Promise<void> {}
}
