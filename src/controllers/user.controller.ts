import { AuthRequest } from "../middleware/auth.middleware";
import { UserServiceImpl } from "../services/impl/user.service.impl";
import { asyncHandler } from "../utils/asyncHandler.util";
import {Request, Response} from "express"
export class UserController{
    private userService = new UserServiceImpl()

    // Get user by id
    getUserById= asyncHandler(async(req:Request, res:Response)=>{
        const {id} = req.params;
        const userIdFound = await this.userService.getUserById(Number(id));
        res.status(200).json(userIdFound)
    })

    // Get all Users
    getAllUsers = asyncHandler(async(_req: AuthRequest, res:Response)=>{
        const users = await this.userService.getAllUser();
        res.status(200).json(users)
    })
    
    // delete user
    deleteUser = asyncHandler(async(req:Request, res: Response)=>{
        const {id} = req.params
        await this.userService.deleteUser(Number(id));
        res.status(204).send()
    })
}