import { AppError } from "../exception/AppError";
import { AuthServiceimpl } from "../services/impl/auth.service.impl";
import { asyncHandler } from "../utils/asyncHandler.util";
import {Request, Response} from "express";

export class AuthController{
    private authService = new AuthServiceimpl();

    // create new userInfo(Sign up)

    signup = asyncHandler(async(req: Request, res: Response)=>{
        const user = await this.authService.createUser(req.body);
        if(!user){
            throw new AppError("User creation failed", 400);
        }
        res.status(201).json(user);
    })

    login = asyncHandler(async(req: Request, res: Response) => {
        const authResponse = await this.authService.login(req.body);
        if(!authResponse){
            throw new AppError("Invalid Credentials", 401);
        }
        res.status(200).json(authResponse);
    });
}