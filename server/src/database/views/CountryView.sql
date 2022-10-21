create or replace view public.v_country as
	select id, name, iso2, iso3 
	from public.country
;