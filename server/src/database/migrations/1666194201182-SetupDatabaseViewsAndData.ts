import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupDatabaseViewsAndData1666194201182
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create or replace view v_city as
        select id, name, country_id from public.city;
        `);
    await queryRunner.query(`
        create or replace view public.v_country as
	        select id, name, iso2, iso3 
	    from public.country;
    `);

    await queryRunner.query(`
    create or replace
    view v_staff as
    select
        s.id,
        u.first_name as first_name,
        u.last_name as last_name,
        u.email as email,
        sr."name" as role
    from
        staff s
    left join "user" u 
    on
        s.user_id = u.id
    left join staff_roles sr 
    on
        sr.id = s.roles_id;
    `);
  }

  public async down(): Promise<void> {}
}
