import {client} from "../app";

export const saveUploadedFileToDb = async (...args: (string | number| null)[]) => {
    try {
        const values = [...args];
        const query = 'INSERT INTO uploaded_files ' +
            '(file_name, file_data, file_size, file_type, compress_ratio, compressed_file_data, compressed_file_size)' +
            ' VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        return await client.query(query, values);
    } catch (err) {
        throw err;
    }
};

export const updateUploadedFileWithCompressedData = async (...args: (string | number)[]) => {
    try {
        const values = [...args];
        const query = 'UPDATE uploaded_files SET compressed_file_data = $1, compressed_file_size = $2 WHERE id = $3';
        await client.query(query, values);
    } catch (err) {
        throw err;
    }
};