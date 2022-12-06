use todoapp;

create table users (
	id int primary key auto_increment,
    username varchar(120) not null unique,
    passwd varchar(255) not null,
    token varchar(255) default 'xxxx',
    signin_at timestamp default now(),
    signout_at timestamp default null,
    create_at timestamp default now(),
    update_at timestamp default null,
    delete_at timestamp default null
);

create table todos (
	id int primary key auto_increment,
    id_user int not null,
    username varchar(255) default '@unknown',
    label varchar(255) not null,
    checked boolean default false,
	checked_at timestamp default now(),
	create_at timestamp default now(),
    update_at timestamp default null,
    delete_at timestamp default null
);

insert into users (username, passwd) values ('test1', 'test123');