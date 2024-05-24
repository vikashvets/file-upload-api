import sharp from "sharp";
import {updateUploadedFileWithCompressedData} from "../db/queries";
import {splitBase64Header, splitDataTypeHeader} from "../utils/dataSplitter";
import {wsClients} from "../wsServer";


export const compressFile = async (fileData: string, fileName: string, fileType:string, compressRatio: number, id: number, wsClientId: string) => {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const compressedImage = sharp(Buffer.from(splitBase64Header(fileData), 'base64'))[splitDataTypeHeader(fileType)]({
            compressionLevel: compressRatio
        });
        const compressedImageBuffer = await compressedImage.toBuffer();
        await updateUploadedFileWithCompressedData(compressedImageBuffer, compressedImageBuffer.byteLength, id);

        wsClients.get(wsClientId).send(`File "${fileName}" compressed successfully with ratio ${compressRatio}, result size: ${compressedImageBuffer.byteLength} bytes`);
        console.log(`Notification was sent to the client ${wsClientId}`);

        compressedImage.toFile(`./images/compressed-${fileName}`) // Temporary save compressed image to disk for testing purposes
            .then(() => {
                console.log(`Compressed ${fileName} successfully`);
            });
    } catch (err) {
        console.error(err);
    }
}
