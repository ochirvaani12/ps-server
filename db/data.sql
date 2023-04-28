INSERT INTO ps_config (item_code, value, description, created_datetime) VALUES('FEE_PERCENT', '10', 'Үйлчилгээнээс авах шимтгэлийн хэмжээ', current_timestamp) ON CONFLICT DO NOTHING;

INSERT INTO ps_app (app_id, app_secret, chnl_type, min_version, last_version) VALUES(1, 'PS_CUST', 'IOS', 1, 1) ON CONFLICT DO NOTHING;
INSERT INTO ps_app (app_id, app_secret, chnl_type, min_version, last_version) VALUES(2, 'PS_CUST', 'ANDROID', 1, 1) ON CONFLICT DO NOTHING;
INSERT INTO ps_app (app_id, app_secret, chnl_type, min_version, last_version) VALUES(3, 'PS_PSYCHOLOGIST', 'IOS', 1, 1) ON CONFLICT DO NOTHING;
INSERT INTO ps_app (app_id, app_secret, chnl_type, min_version, last_version) VALUES(4, 'PS_PSYCHOLOGIST', 'ANDROID', 1, 1) ON CONFLICT DO NOTHING;
INSERT INTO ps_app (app_id, app_secret, chnl_type) VALUES(5, 'PS_STAFF', 'WEB') ON CONFLICT DO NOTHING;

INSERT INTO ps_cust_type (cust_type, name, name2, order_no, created_datetime) VALUES('CUSTOMER', 'Үйлчлүүлэгч', 'Customer', 1, current_timestamp) ON CONFLICT DO NOTHING;
INSERT INTO ps_cust_type (cust_type, name, name2, order_no, created_datetime) VALUES('PSYCHOLOGIST', 'Сэтгэл зүйч', 'Psychologist', 2, current_timestamp) ON CONFLICT DO NOTHING;
INSERT INTO ps_cust_type (cust_type, name, name2, order_no, created_datetime) VALUES('STAFF', 'Ажилтан', 'Staff', 3, current_timestamp) ON CONFLICT DO NOTHING;

INSERT INTO ps_role (role_id, name, name2, status, created_datetime) VALUES(1, 'Үйлчлүүлэгч', 'Customer', 'ACTIVE', current_timestamp) ON CONFLICT DO NOTHING; INSERT INTO ps_role_cust_type (cust_type, role_id) VALUES('CUSTOMER', 1);
INSERT INTO ps_role (role_id, name, name2, status, created_datetime) VALUES(2, 'Сэтгэл зүйч', 'Psychologist', 'ACTIVE', current_timestamp) ON CONFLICT DO NOTHING; INSERT INTO ps_role_cust_type (cust_type, role_id) VALUES('PSYCHOLOGIST', 2);
INSERT INTO ps_role (role_id, name, name2, status, created_datetime) VALUES(3, 'Ажилтан', 'Staff', 'ACTIVE', current_timestamp) ON CONFLICT DO NOTHING; INSERT INTO ps_role_cust_type (cust_type, role_id) VALUES('STAFF', 3);

INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(1001, 'Харилцагчийн дэлгэрэнгүй', 'Customer detail', 'detailCust') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('1', 1001) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(1002, 'Нэмэлт мэдээллийн жагсаалт', 'Customer attribute list', 'selectCustAttr') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('1', 1002) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(1003, 'Нэмэлт мэдээлэл шинэцлэх', 'Update customer attribute', 'updateCustAttr') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('1', 1003) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(1004, 'Сэтгэл зүйчийн жагсаалт авах', 'Psychologist list', 'selectPsychologist') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('1', 1004) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(1005, 'Сэтгэл зүйчийн дэлгэрэнгүй', 'Psychologist detail', 'detailPsychologist') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('1', 1005) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(1006, 'Уулзалтын жагсаалт', 'Meeting list', 'selectServiceReq') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('1', 1006) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(1007, 'Уулзалтын баталгаажуулах', 'Confirm meeting', 'confirmServiceReq') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('1', 1007) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(1008, 'Уулзалтын хүсэлт илгээх', 'Create meeting request', 'createServiceReq') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('1', 1008) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(1009, 'Уулзалтнд орох', 'Enter meeting request', 'startServiceReq') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('1', 1009) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(1010, 'Уулзалтыг дуусгах', 'End meeting request', 'finishServiceReq') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('1', 1010) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(1011, 'Дансны дэлгэрэнгүй', 'Bank account detail', 'detailBankAcnt') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('1', 1011) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(1012, 'Нэхэмжлэлийн жагсаалт авах', 'Invoice list', 'selectInvoice') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('1', 1012) ON CONFLICT DO NOTHING;

INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(2001, 'Харилцагчийн дэлгэрэнгүй', 'Customer detail', 'detailCust') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('2', 2001) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(2002, 'Нэмэлт мэдээллийн жагсаалт', 'Customer attribute list', 'selectCustAttr') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('2', 2002) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(2003, 'Нэмэлт мэдээлэл шинэцлэх', 'Update customer attribute', 'updateCustAttr') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('2', 2003) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(2004, 'Уулзалтын жагсаалт', 'Meeting list', 'selectServiceReq') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('2', 2004) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(2005, 'Уулзалтнд орох', 'Enter meeting request', 'startServiceReq') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('2', 2005) ON CONFLICT DO NOTHING;
INSERT INTO ps_operation (oper_code, name, name2, func_code) VALUES(2006, 'Уулзалтыг дуусгах', 'End meeting request', 'finishServiceReq') ON CONFLICT DO NOTHING; INSERT INTO ps_role_oper (role_id, oper_code) VALUES('2', 2006) ON CONFLICT DO NOTHING;

INSERT INTO ps_cust_attr_type (cust_type, attr_type, name, name2, description, description2, is_required, created_datetime) VALUES('PSYCHOLOGIST', 'EXPERIENCE', 'Ажилсан жил', 'Work experience', 'Ажилсан жилийн хэмжээг оруулна.', 'Duration of work experience', 1, current_timestamp) ON CONFLICT DO NOTHING;
INSERT INTO ps_cust_attr_type (cust_type, attr_type, name, name2, description, description2, is_required, created_datetime) VALUES('PSYCHOLOGIST', 'ABOUT', 'Миний тухай', 'About', 'Дэлгэрэнгүй дээр харгадах дэлгэрэнгүй мэдээлэл', 'About full description', 1, current_timestamp) ON CONFLICT DO NOTHING;

INSERT INTO ps_service_type (service_type, name, name2, order_no, created_datetime) VALUES('PS_MEETING', 'Сэтгэл зүйн уулзалт', 'Psychologist meeting service', 1, current_timestamp) ON CONFLICT DO NOTHING; INSERT INTO ps_service_cust_type (service_type, cust_type) VALUES('PS_MEETING', 'PSYCHOLOGIST') ON CONFLICT DO NOTHING;

INSERT INTO ps_acnt_type (acnt_type, name, name2, created_datetime) VALUES('PMT_ACNT', 'Төлбөрийн данс', 'Payment account', current_timestamp) ON CONFLICT DO NOTHING;
INSERT INTO ps_acnt_type (acnt_type, name, name2, created_datetime) VALUES('ACTIVE_ACNT', 'Төлбөр хүлээн авах данс', 'Active account', current_timestamp) ON CONFLICT DO NOTHING;
