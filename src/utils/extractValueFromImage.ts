/**** Receive an image in base64 and extract its value */

import { model } from '../services/genAiClient';

async function extractValueFromImage(base64Image: string): Promise<number> {
    const prompt = "Describe the measurement in this image.";
    
    const image = {
        inlineData: {
            data: base64Image.split(',')[1], // Remove o prefixo "data:image/png;base64,"
            mimeType: "image/jpg",
        },
    };

    try {
        const result = await model.generateContent([prompt, image]);
        const responseText = result.response.text();
        console.log('Generated content:', responseText);

        // Use uma expressão regular para extrair o valor numérico
        const match = responseText.match(/[\d.]+/);
        
        if (match) {
            const value = parseFloat(match[0]);
            if (!isNaN(value)) {
                return value;
            }
        }

    } catch (error) {
        console.error('Error processing image with LLM:', error);
        throw new Error('Failed to process image with LLM');
    }
}

export default extractValueFromImage;