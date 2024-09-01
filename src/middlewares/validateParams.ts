import { Request, Response, NextFunction } from "express";

function validateParams(req:Request, res:Response, next:NextFunction) {
    const {image_url, customer_code, measure_datetime, measure_type} = req.body;
    
    if (!image_url || !customer_code || !measure_datetime || !measure_type) {
        return res.status(400).json(
            {error_code: "INVALID_DATA",
                error_description: "Descrição do erro"
            }
        );
    }

    next();
};

export default { validateParams };