import { Request } from "express";
import { AppError } from "../exception/AppError";

export function extractTokenFromHeader(req:Request):string {
    const authHeaderRaw = req.headers["authorization"];
    const authHeader = Array.isArray(authHeaderRaw)
    ? authHeaderRaw[0]: authHeaderRaw;
    if (!authHeader){
        throw new AppError("Authorization header missing", 401);
    }
    if(typeof authHeader!=="string" || !authHeader.startsWith("Bearer")){
        throw new AppError("Invalid Authorization header format", 401);
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        throw new AppError("Token not found in Authorization header", 401)
    }
    return token;
}