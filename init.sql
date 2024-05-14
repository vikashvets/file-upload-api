create database file_upload;
       create table if not exists uploaded_files (
           id serial primary key,
           file_name varchar(255),
           file_size int,
           file_type varchar(255),
           file_data bytea,
           compressed_file_data bytea,
           compress_ratio int,
           compressed_file_size int
       );