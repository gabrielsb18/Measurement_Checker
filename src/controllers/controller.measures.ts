import { Request, Response } from 'express';
import prisma from "../../prisma/prisma";

import downloadImageAsBase64 from '../utils/downloadImageAsBase64';
import extractValueFromImage from '../utils/extractValueFromImage';

function getMonthRange(date: Date) {
    
    const startOfMonth = new Date(
        date.getFullYear(),
        date.getMonth(), 1);
    
    const endOfMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1, 0);
    
    
    return { startOfMonth, endOfMonth };
}

async function createMeasure(req:Request, res:Response) {
    const {image_url, customer_code, measure_datetime, measure_type} = req.body;

    const measureDate = new Date(measure_datetime);

    const {startOfMonth, endOfMonth} = getMonthRange(measureDate);

    const verifyMeasure = await prisma.measures.findFirst({
        where: { customer: {
            customer_code
        },
            measure_type: measure_type,
            measure_datetime: {
                gte: startOfMonth,
                lte: endOfMonth
            }
        }
    })

    if(verifyMeasure) {
        return res.status(409).json(
            {error_code: "DOUBLE_REPORT",
                error_description: "Leitura do mês já realizada"
            }
        );
    }

    /** Make the image conversion to the base64 format supported by Gemini */
    const base64Image = await downloadImageAsBase64(image_url);

    /** Extract the value from the image */
    const measurementValueLLM = await extractValueFromImage(base64Image);

    const newMeasure = await prisma.measures.create({
        data: {
            customer_code,
            measure_type: measure_type,
            image_url: image_url,
            measure_value: measurementValueLLM,
            measure_datetime: measureDate
        }
    });

    return res.status(200).json({
        image_url: newMeasure.image_url,
        measure_value: newMeasure.measure_value,
        measure_uuid: newMeasure.measure_uuid
    })

};

export default { createMeasure };