-- use tienda;

create table productos (
    id int primary key auto_increment,
    sku varchar(255) not null unique,
    imagen text,
    nombre varchar(255) not null,
    descripcion text,
    existencias int default 0,
    creado timestamp default now(),
    actualizado timestamp default null,
    eliminado timestamp default null,
    activo boolean default 1,
    estado int default 1001
);