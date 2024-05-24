import {client} from "../app";

export const saveUploadedFileToDb = async (...args: (string | number| null)[]) => {
    const values = [...args];
    const query = 'INSERT INTO uploaded_files ' +
        '("fileName", "fileData", "fileSize", "fileType", "compressRatio", "compressedFileData", "compressedFileSize")' +
        ' VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        return await client.query(query, values);
};

export const updateUploadedFileWithCompressedData = async (...args: (string | number)[]) => {
    const values = [...args];
    const query = 'UPDATE uploaded_files SET ' +
        '"compressedFileData" = $1, "compressedFileSize" = $2 WHERE "id" = $3';
    await client.query(query, values);
};


export const getFileList = async (...args: (string | number)[]) => {
    const values = [...args];
    const query = 'SELECT ' +
        '"fileName", "fileType", "fileSize", "compressedFileData", "compressedFileSize", "compressRatio", "id"' +
        ' FROM uploaded_files LIMIT $1 OFFSET $2';
        return await client.query(query, values);
};

export const getFilesCount = async () => {
    const query = 'SELECT COUNT(*) FROM uploaded_files';
    return await client.query(query);
};