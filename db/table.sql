-- system tables
create table if not exists ps_config (
    item_code varchar(40) PRIMARY KEY,
    value varchar(40),
    description varchar(1000),
    created_datetime timestamp not null
);

create table if not exists ps_app (
    app_id integer PRIMARY KEY,
    app_secret varchar(20) not null,
    chnl_type varchar(20),
    min_version integer,
    last_version integer,
    notif_url varchar(200),
    notif_key varchar(200),
    notif_time_to_live integer,
    notif_title varchar(200)
);

create table if not exists ps_bulg (
    bulg_id integer PRIMARY KEY,
    table_name varchar(40) not null,
    action varchar(20) not null,
    cust_code varchar(20),
    oper_code varchar(20),
    created_datetime timestamp not null
);

create table if not exists ps_bulg_item (
    bulg_id integer not null,
    table_name varchar(40) not null,
    field_code varchar(20) not null,
    old_val varchar(1000),
    new_val varchar(1000),
    FOREIGN KEY (bulg_id) REFERENCES ps_bulg (bulg_id),
    PRIMARY KEY (bulg_id, table_name, field_code)
);

-- operation tables
create table if not exists ps_role (
    role_id integer primary key,
    name varchar(20) not null,
    name2 varchar(20),
    status varchar(20) not null,
    created_datetime timestamp not null
);

create table if not exists ps_role_cust_type (
    cust_type varchar(20) primary key,
    role_id integer not null,
    FOREIGN KEY (role_id) REFERENCES ps_role (role_id),
    FOREIGN KEY (cust_type) REFERENCES ps_cust_type (cust_type)
);

create table if not exists ps_operation (
    oper_code varchar(20) primary key,
    name varchar(100) not null,
    name2 varchar(100),
    func_code varchar(100) not null,
    lookup varchar(100)
);

create table if not exists ps_role_oper (
    role_id integer not null,
    oper_code varchar(20) not null,
    FOREIGN KEY (oper_code) REFERENCES ps_operation (oper_code),
    FOREIGN KEY (role_id) REFERENCES ps_role (role_id),
    PRIMARY KEY (role_id, oper_code)
);

-- api tables
create table if not exists ps_api (
    api_code varchar(20) primary key,
    name varchar(20) not null,
    name2 varchar(20),
    description varchar(1000) not null,
    description2 varchar(1000),
    status varchar(20) not null,
    connect_timeout integer not null,
    read_timeout integer not null,
    param_count integer not null
);

create table if not exists ps_api_cfg (
    api_code varchar(20) not null,
    item_code varchar(20) not null,
    value varchar(20),
    description varchar(1000) not null,
    description2 varchar(1000),
    created_datetime timestamp not null,
    FOREIGN KEY (api_code) REFERENCES ps_api (api_code),
    PRIMARY KEY (api_code, item_code)
);

create table if not exists ps_api_param (
    api_code varchar(20) not null,
    item_no integer not null,
    param_type varchar(20) not null,
    suffix varchar(100),
    value varchar(20) not null,
    created_datetime timestamp not null,
    FOREIGN KEY (api_code) REFERENCES ps_api (api_code),
    PRIMARY KEY (api_code, item_no)
);

create table if not exists ps_api_func (
    api_code varchar(20) not null,
    func_code varchar(20) not null,
    description varchar(1000) not null,
    description2 varchar(1000),
    url varchar(100) not null,
    uri varchar(100),
    method varchar(20) not null,
    content_type varchar(20) not null,
    has_response integer not null,
    is_url_encoded integer not null,
    pipeline_id integer,
    created_datetime timestamp not null,
    FOREIGN KEY (api_code) REFERENCES ps_api (api_code),
    PRIMARY KEY (api_code, func_code)
);

create table if not exists ps_api_res (
    api_code varchar(20) not null,
    func_code varchar(20) not null,
    field_type varchar(20) not null,
    key varchar(1000) not null,
    value varchar(100) not null,
    description varchar(1000) not null,
    description2 varchar(1000),
    is_success integer,
    FOREIGN KEY (api_code) REFERENCES ps_api (api_code),
    PRIMARY KEY (api_code, func_code, field_type)
);

create table if not exists ps_api_log (
    rec_id integer primary key,
    api_code varchar(20) not null,
    func_code varchar(20) not null,
    url varchar(20) not null,
    header varchar(400),
    request varchar(400),
    response varchar(1000),
    http_code integer not null,
    http_desc varchar(1000),
    started_datetime timestamp not null,
    finished_datetime timestamp not null
);

-- cust tables
create table if not exists ps_cust_type (
    cust_type varchar(20) PRIMARY KEY,
    name varchar(40) not null,
    name2 varchar(40),
    order_no integer,
    created_datetime timestamp not null
);

create table if not exists ps_cust_type_cfg (
    cust_type varchar(20) not null,
    item_code varchar(20) not null,
    value varchar(100),
    order_no integer,
    created_datetime timestamp not null,
    FOREIGN KEY (cust_type) REFERENCES ps_cust_type (cust_type),
    PRIMARY KEY (cust_type, item_code)
);

create table if not exists ps_cust_attr_type (
    cust_type varchar(20) not null,
    attr_type varchar(20) not null,
    name varchar(40) not null,
    name2 varchar(40),
    description varchar(1000),
    description2 varchar(1000),
    is_required integer not null,
    created_datetime timestamp not null,
    FOREIGN KEY (cust_type) REFERENCES ps_cust_type (cust_type),
    PRIMARY KEY (cust_type, attr_type)
);

create table if not exists ps_cust (
    cust_code varchar(20) PRIMARY KEY,
    firstname varchar(40) not null,
    lastname varchar(40) not null,
    register_code varchar(20) not null,
    status varchar(20) not null,
    mobile_no varchar(20) not null,
    created_datetime timestamp not null
);

create table if not exists ps_cust_type_link (
    cust_code varchar(20),
    cust_type varchar(20),
    FOREIGN KEY (cust_code) REFERENCES ps_cust (cust_code),
    FOREIGN KEY (cust_type) REFERENCES ps_cust_type (cust_type),
    PRIMARY KEY (cust_code, cust_type)
);

create table if not exists ps_cust_attr (
    attr_type varchar(20) not null,
    cust_code varchar(20) not null,
    cust_type varchar(20) not null,
    value varchar(1000),
    verf_status varchar(40),
    verf_datetime timestamp,
    created_datetime timestamp not null,
    FOREIGN KEY (cust_code) REFERENCES ps_cust (cust_code),
    FOREIGN KEY (cust_type, attr_type) REFERENCES ps_cust_attr_type (cust_type, attr_type),
    PRIMARY KEY (attr_type, cust_code, cust_type)
);

create table if not exists ps_cust_device (
    cust_code varchar(20) not null,
    cust_type varchar(20) not null,
    device_id varchar(100) not null,
    ip varchar(20) not null,
    access_count integer not null,
    last_access_datetime timestamp not null,
    FOREIGN KEY (cust_code) REFERENCES ps_cust (cust_code),
    FOREIGN KEY (cust_type) REFERENCES ps_cust_type (cust_type),
    PRIMARY KEY (cust_code, cust_type, device_id)
);

create table if not exists ps_cust_login (
    cust_type varchar(20) not null,
    login_code varchar(40) not null,
    cust_code varchar(20) not null,
    cred varchar(100) not null,
    status varchar(20),
    tried_count integer,
    modified_datetime timestamp,
    created_datetime timestamp not null,
    FOREIGN KEY (cust_code) REFERENCES ps_cust (cust_code),
    FOREIGN KEY (cust_type) REFERENCES ps_cust_type (cust_type),
    PRIMARY KEY (cust_type, login_code)
);

create table if not exists ps_session (
    session varchar(200) primary key,
    cust_code varchar(20) not null,
    cust_type varchar(20) not null,
    login_code varchar(40) not null,
    status varchar(20) not null,
    device_id varchar(100) not null,
    ip varchar(20) not null,
    app_id integer not null,
    active_duration integer not null,
    expire_datetime timestamp not null,
    created_datetime timestamp not null,
    FOREIGN KEY (cust_code) REFERENCES ps_cust (cust_code),
    FOREIGN KEY (cust_type) REFERENCES ps_cust_type (cust_type)
);

-- service tables
create table if not exists ps_service_type (
    service_type varchar(20) primary key,
    name varchar(100) not null,
    name2 varchar(100),
    order_no integer not null,
    created_datetime timestamp not null
);

create table if not exists ps_service_cust_type (
    service_type varchar(20) not null,
    cust_type varchar(20) not null,
    FOREIGN KEY (service_type) REFERENCES ps_service_type (service_type),
    FOREIGN KEY (cust_type) REFERENCES ps_cust_type (cust_type),
    PRIMARY KEY (service_type, cust_type)
);

create table if not exists ps_cust_service (
    cust_code varchar(20) not null,
    cust_type varchar(20) not null,
    service_type varchar(20) not null,
    description varchar(1000) not null,
    description2 varchar(1000),
    price numeric(23, 2) not null,
    status varchar(20) not null,
    created_datetime timestamp not null,
    FOREIGN KEY (cust_code) REFERENCES ps_cust (cust_code),
    FOREIGN KEY (cust_type) REFERENCES ps_cust_type (cust_type),
    FOREIGN KEY (service_type) REFERENCES ps_service_type (service_type),
    PRIMARY KEY (cust_code, cust_type, service_type)
);

create table if not exists ps_cust_service_req (
    req_id integer primary key,
    cust_code varchar(20) not null,
    cust_type varchar(20) not null,
    sp_cust_code varchar(20) not null,
    sp_cust_type varchar(20) not null,
    service_type varchar(20) not null,
    service_date date not null,
    start_time time not null,
    end_time time not null,
    duration integer not null,
    status varchar(20) not null,
    price numeric(23, 2) not null,
    total_price numeric(23, 2) not null,
    created_datetime timestamp not null,
    FOREIGN KEY (cust_code) REFERENCES ps_cust (cust_code),
    FOREIGN KEY (cust_type) REFERENCES ps_cust_type (cust_type),
    FOREIGN KEY (sp_cust_code) REFERENCES ps_cust (cust_code),
    FOREIGN KEY (sp_cust_type) REFERENCES ps_cust_type (cust_type),
    FOREIGN KEY (service_type) REFERENCES ps_service_type (service_type)
);

create table if not exists ps_cust_service_req_log (
    req_id integer not null,
    item_no integer not null,
    log_type varchar(20) not null,
    value varchar(20),
    created_datetime timestamp not null,
    FOREIGN KEY (req_id) REFERENCES ps_cust_service_req (req_id),
    PRIMARY KEY (req_id, item_no)
);

-- bank tables
create table if not exists ps_bank (
    bank_code varchar(20) primary key,
    name varchar(20) not null,
    name2 varchar(20),
    status varchar(20) not null,
    picture varchar(400),
    api_code varchar(20) not null,
    order_no integer not null,
    created_datetime timestamp not null
);

create table if not exists ps_bank_cfg (
    bank_code varchar(20) not null,
    item_code varchar(20) not null,
    value varchar(20),
    description varchar(1000) not null,
    description2 varchar(1000),
    created_datetime timestamp not null,
    FOREIGN KEY (bank_code) REFERENCES ps_bank (bank_code),
    PRIMARY KEY (bank_code, item_code)
);

create table if not exists ps_acnt_type (
    acnt_type varchar(20) primary key,
    name varchar(20) not null,
    name2 varchar(20),
    order_no integer not null,
    created_datetime timestamp not null
);

create table if not exists ps_acnt (
    acnt_type varchar(20) not null,
    cust_code varchar(20) not null,
    cust_type varchar(20) not null,
    bank_code varchar(20) not null,
    acnt_code varchar(20) not null,
    acnt_name varchar(40) not null,
    status varchar(20) not null,
    created_datetime timestamp not null,
    FOREIGN KEY (acnt_type) REFERENCES ps_acnt_type (acnt_type),
    FOREIGN KEY (bank_code) REFERENCES ps_bank (bank_code),
    FOREIGN KEY (cust_code) REFERENCES ps_cust (cust_code),
    FOREIGN KEY (cust_type) REFERENCES ps_cust_type (cust_type),
    PRIMARY KEY (acnt_type, cust_code, cust_type)
);

-- notif tables
create table if not exists ps_notif_type (
    notif_type varchar(20) primary key,
    name varchar(20) not null,
    name2 varchar(20),
    description varchar(1000) not null,
    description2 varchar(1000),
    created_datetime timestamp not null
);

create table if not exists ps_notif (
    oper_code varchar(20) primary key,
    title varchar(200) not null,
    title2 varchar(200),
    description varchar(1000) not null,
    notif_type varchar(20) not null,
    created_datetime timestamp not null,
    FOREIGN KEY (notif_type) REFERENCES ps_notif_type (notif_type)
);

create table if not exists ps_email_notif (
    rec_id integer primary key,
    email_to varchar(100) not null,
    email_bcc varchar(500),
    email_cc varchar(500),
    title varchar(200) not null,
    subject varchar(1000),
    status varchar(20) not null,
    is_body_html integer not null,
    res_code varchar(20),
    res_desc varchar(1000),
    sent_datetime timestamp not null,
    created_datetime timestamp not null
);

create table if not exists ps_mobile_notif (
    rec_id integer primary key,
    mobile_no varchar(100) not null,
    body varchar(500) not null,
    body_length integer not null,
    created_datetime timestamp not null
);

create table if not exists ps_smart_notif (
    rec_id integer primary key,
    cust_code varchar(20) not null,
    cust_type varchar(20) not null,
    title varchar(100) not null,
    body varchar(500) not null,
    status varchar(20) not null,
    read_datetime timestamp,
    created_datetime timestamp not null,
    FOREIGN KEY (cust_code) REFERENCES ps_cust (cust_code),
    FOREIGN KEY (cust_type) REFERENCES ps_cust_type (cust_type)
);

create table if not exists ps_tkn_type (
    tkn_type varchar(20) primary key,
    name varchar(20) not null,
    name2 varchar(20),
    status varchar(20) not null,
    active_duration integer not null,
    notif_type varchar(20) not null,
    notif varchar(500) not null
);

create table if not exists ps_tkn (
    rec_id integer primary key,
    creater_type varchar(20) not null,
    created_by varchar(20) not null,
    tkn_type varchar(20) not null,
    tkn varchar(20) not null,
    status varchar(20) not null,
    created_datetime timestamp not null,
    FOREIGN KEY (tkn_type) REFERENCES ps_tkn_type (tkn_type)
);

-- fin tables
create table if not exists ps_fin_invoice (
    invoice_id integer primary key,
    pay_amt numeric(23, 2) not null,
    paid_amt numeric(23, 2) not null,
    fee_amt numeric(23, 2) not null,
    paid_fee_amt numeric(23, 2) not null,
    service_type varchar(20) not null,
    pay_cust_code varchar(20) not null,
    pay_cust_type varchar(20) not null,
    receive_cust_code varchar(20) not null,
    receive_cust_type varchar(20) not null,
    src_bank_code varchar(20) not null,
    src_acnt_code varchar(20) not null,
    dst_bank_code varchar(20) not null,
    dst_acnt_code varchar(20) not null,
    repay_date date not null,
    closed_datetime timestamp,
    created_datetime timestamp not null,
    FOREIGN KEY (pay_cust_code) REFERENCES ps_cust (cust_code),
    FOREIGN KEY (pay_cust_type) REFERENCES ps_cust_type (cust_type),
    FOREIGN KEY (receive_cust_code) REFERENCES ps_cust (cust_code),
    FOREIGN KEY (receive_cust_type) REFERENCES ps_cust_type (cust_type)
);