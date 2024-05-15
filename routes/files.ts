import express, { Request, Response, NextFunction } from 'express';
import {compressFile} from "../services/compressFile";
import {getFileList, saveUploadedFileToDb} from "../db/queries";

const router = express.Router();

router.post('/upload-file',  async function (req: Request, res: Response, next: NextFunction) {
    try {
        const {fileName, fileData, fileSize, fileType, compressRatio} = req.body;
        const result = await saveUploadedFileToDb(fileName, fileData, fileSize, fileType, compressRatio, null, null);
        compressFile(fileData, fileName, fileType, Number(compressRatio), result.rows[0].id);
        res.status(200).json("File uploaded successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occurred'});
    }
});

router.get('/files',  async function (req: Request, res: Response, next: NextFunction) {
    try {
        const result = await getFileList();
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occurred'});
    }
});

module.exports = router;