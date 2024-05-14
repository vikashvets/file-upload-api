import sharp from "sharp";
import {updateUploadedFileWithCompressedData} from "../db/queries";
import {splitBase64Header, splitDataTypeHeader} from "../utils/dataSplitter";

export const compressFile = async (fileData: string, fileName: string, fileType:string, compressRatio: number, id: number) => {
    try {
        // @ts-ignore
        const compressedImage = sharp(Buffer.from(splitBase64Header(fileData), 'base64'))[splitDataTypeHeader(fileType)]
            ({
                compressionLevel: compressRatio,
            });
        const compressedImageBuffer = await compressedImage.toBuffer();
        await updateUploadedFileWithCompressedData(compressedImageBuffer.toString('base64'), compressedImageBuffer.byteLength, id);
        compressedImage.toFile(`./images/compressed-${fileName}`) // Temporary save compressed image to disk for testing purposes
            .then(() => {
                console.log(`Compressed ${fileName} successfully`);
            });
    } catch (err) {
        console.error(err);
    }
}
