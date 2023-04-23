drop view if exists vw_ps_psychologist;
create view vw_ps_psychologist as
select
    l.cust_code,
    l.cust_type,
    ct.name as cust_type_name,
    c.firstname,
    c.lastname,
    c.register_code,
    c.status,
    c.mobile_no,
    a.value as experience,
    a2.value as about
from ps_cust c
left join ps_cust_type_link l on l.cust_code = c.cust_code
left join ps_cust_type ct on ct.cust_type = l.cust_type
left join ps_cust_attr a on a.cust_type = l.cust_type
    and a.cust_code = l.cust_code
    and a.attr_type = 'EXPERIENCE'
    and a.verf_status = 'VERIFIED'
left join ps_cust_attr a2 on a2.cust_type = l.cust_type
    and a2.cust_code = l.cust_code
    and a2.attr_type = 'ABOUT'
    and a2.verf_status = 'VERIFIED';

drop view if exists vw_ps_cust_attr;
create view vw_ps_cust_attr as
select 
	l.cust_code,
	l.cust_type,
	at.attr_type,
	at.name,
	at.name2,
	at.description,
	at.description2,
	a.value,
	a.verf_status,
	at.is_required
from ps_cust_type_link l
left join ps_cust_attr a on a.cust_type = l.cust_type and a.cust_code = l.cust_code
left join ps_cust_attr_type at on at.cust_type = l.cust_type and at.attr_type = a.attr_type;