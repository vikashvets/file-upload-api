import express, { Request, Response, NextFunction } from 'express';
import {compressFile} from "../services/compressFile";
import {getFileList, getFilesCount, saveUploadedFileToDb} from "../db/queries";

const router = express.Router();

router.post('/upload-file',  async function (req: Request, res: Response, next: NextFunction) {
    try {
        const {fileName, fileData, fileSize, fileType, compressRatio} = req.body;
        const result = await saveUploadedFileToDb(fileName, fileData, fileSize, fileType, compressRatio, null, null);
        res.status(200).json("File uploaded successfully");
        compressFile(fileData, fileName, fileType, compressRatio, result.rows[0].id, req.headers['client-id'] as string);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occurred'});
    }
});

router.get('/files',  async function (req: Request, res: Response, next: NextFunction) {
    try {
        const { page, perPage } = req.query;

        const filesResult = await getFileList(Number(perPage), Number(perPage) * (Number(page) - 1));
        const filesCount = await getFilesCount();

        const files = filesResult.rows.map(row => ({
            ...row,
            compressedFileData: `data:${row.fileType};base64,${row.compressedFileData.toString('base64')}`,
            compressedFileSize: `${row.compressedFileSize} bytes`,
            fileSize: `${row.fileSize} bytes`,
        }));
        res.status(200).json({files, pagination: {
                page: Number(req.query.page),
                perPage: Number(req.query.perPage),
                totalItems: Number(filesCount.rows[0].count)
        }});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occurred'});
    }
});

module.exports = router;
