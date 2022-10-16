create or replace
view v_staff as
select
	s.id,
	u."name" as first_name,
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