create database if not exists hamburgueseria;

use hamburgueseria;

create user if not exists dsw@'%' identified by 'dsw';
GRANT SELECT, UPDATE, INSERT, DELETE ON hamburgueseria.* TO 'dsw'@'%';

