import { sanitize } from "class-sanitizer";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function dtoValidationMiddleware(type:any){
    return async (req: Request, res: Response, next: NextFunction)=> {
        if(!req.body || Object.keys(req.body).length === 0){
            return res.status(400).json({
                message:"Request body cannot be empty",
            })
        }
        const dtoObj = plainToInstance(type, req.body || {}); 
        sanitize(dtoObj);
        
        const errors = await validate(dtoObj,{
            whitelist: true,
            forbidNonWhitelisted: true,
        })
        if (errors.length > 0){
            return res.status(400).json({
                message:"Validation failed",
                errors: errors.map((err)=> ({
                    property: err.property,
                    constraints: err.constraints,
                }))
            })
        }
        req.body = dtoObj;
        next();
    }
}