import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import {compressFile} from "../services/compressFile";
import {saveUploadedFileToDb} from "../db/queries";

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

module.exports = router;
