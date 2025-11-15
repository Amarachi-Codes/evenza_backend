import { Request,NextFunction, Response } from "express";
import jwt, {JwtPayload as DefaultJwtPayload, VerifyErrors} from "jsonwebtoken";
import { extractTokenFromHeader } from "../utils/token-extractor.util";
import configuration from "../config/config";
import { AppError } from "../exception/AppError";
import { logger } from "../utils/logger.util";


export interface JwtPayload extends DefaultJwtPayload{
sub: string;
role: string;
email: string;
}

export interface AuthRequest extends Request{
    user?: JwtPayload;
}

export const authMiddleware = (roles:string[]=[]) =>{
    return (req:AuthRequest, _res: Response, next:NextFunction)=>{
        try {
            const token = extractTokenFromHeader(req);
            logger.debug("Verifying token:", token);

            const decoded = jwt.verify(token, configuration.jwt.secret) as JwtPayload
            req.user = decoded

            //check if any roles passes
            if(roles.length > 0 && !roles.includes(decoded.role)){
                logger.warn(`Forbidden: Role ${decoded.role} not authorized for required roles ${roles.join(", ")}`);
                return next(new AppError ("forbidden: insufficient role", 403))
            } 
            logger.info("Token verified succesfully for user:", decoded.sub);
            return next()
        } catch (err) {
            const error = err as VerifyErrors;
            logger.error("JWT verification failed:", error.message);

            if (error.name === "TokenExpiredError"){
                return next(new AppError("Token has expired. Please log in again.", 401));
            }else if (error.name === "JsonWebTokenError"){
                return next(new AppError("Invalid token. Please log in again.", 401));
            }else if(error.name === "NotBeforeError"){
                return next(new AppError("Token not ye valid.", 401));
            }
            return next(new AppError("Authentication failed.", 401));
        }
    };
};