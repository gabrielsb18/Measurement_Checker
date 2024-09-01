/****  Receives the image link in the body of the requisition and
converts to the base64 format so that the gemini fasses the processing*/

import axios from "axios";

async function downloadImageAsBase64(imageUrl: string): Promise<string> {
    try {

        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const mimeType = response.headers['content-type'];

        return `data:${mimeType};base64,${base64Image}`;

    } catch (error) {
        throw new error
    }
}

export default downloadImageAsBase64;