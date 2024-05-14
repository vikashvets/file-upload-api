import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { client } from '../app';
import {compressFile} from "../utils/compressFile";

router.post('/upload-file',  async function (req: Request, res: Response, next: NextFunction) {
    try {
        const {fileName, fileData, fileSize, fileType, compressedFileData, compressedFileSize, compressRatio} = req.body;
        const values = [fileName, fileData, fileSize, fileType, compressedFileData, compressedFileSize, compressRatio];
        const query = 'INSERT INTO uploaded_files ' +
            '(file_name, file_data, file_size, file_type, compressed_file_data, compressed_file_size, compress_ratio)' +
            ' VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const result = await client.query(query, values);
        compressFile(fileData, fileName, Number(compressRatio), result.rows[0].id);
        res.status(200).json("File uploaded successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occurred'});
    }
});

module.exports = router;
