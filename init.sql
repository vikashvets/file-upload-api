create database file_upload;
       create table if not exists uploaded_files (
           id serial primary key,
           "fileName" varchar(255),
           "fileSize" int,
           "fileType" varchar(255),
           "fileData" bytea,
           "compressedFileData" bytea,
           "compressRatio" int,
           "compressedFileSize" int
       );