import express, { Request, Response, NextFunction } from 'express';
import {compressFile} from "../services/compressFile";
import {getFileList, saveUploadedFileToDb} from "../db/queries";

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
        const result = await getFileList();
        res.status(200).json(
            result.rows.map(row => ({
                ...row,
                compressedFileData: `data:${row.fileType};base64,${row.compressedFileData.toString('base64')}`
            })
        ));
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occurred'});
    }
});

module.exports = router;
