import {client} from "../app";

export const saveUploadedFileToDb = async (...args: (string | number| null)[]) => {
    try {
        const values = [...args];
        const query = 'INSERT INTO uploaded_files ' +
            '("fileName", "fileData", "fileSize", "fileType", "compressRatio", "compressedFileData", "compressedFileSize")' +
            ' VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        return await client.query(query, values);
    } catch (err) {
        throw err;
    }
};

export const updateUploadedFileWithCompressedData = async (...args: (string | number)[]) => {
    try {
        const values = [...args];
        const query = 'UPDATE uploaded_files SET ' +
            '"compressedFileData" = $1, "compressedFileSize" = $2 WHERE "id" = $3';
        await client.query(query, values);
    } catch (err) {
        throw err;
    }
};


export const getFileList = async (...args: (string | number)[]) => {
    try {
        const values = [...args];
        const query = 'SELECT ' +
            '"fileName", "fileType", "fileSize", "compressedFileData", "compressedFileSize", "compressRatio", "id"' +
            ' FROM uploaded_files';
        return await client.query(query, values);
    } catch (err) {
        throw err;
    }
};