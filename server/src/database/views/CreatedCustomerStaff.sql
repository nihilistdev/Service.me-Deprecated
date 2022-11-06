create or replace view public.v_customer_created_by as
select u.first_name,
    u.last_name,
    u.username,
    u.email
from customer_in_service_center cisc
    left join staff s on s.id = cisc.staff_id
    left join public."user" u on u.id = s.id;