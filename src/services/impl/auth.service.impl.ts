import { Role } from "@prisma/client";
import { db } from "../../config/db";
import { SignUpDto } from "../../dtos/user/request/create-user.dto";
import { UserResponseDTO } from "../../dtos/user/response/user-response-dto";
import { AppError } from "../../exception/AppError";
import { logger } from "../../utils/logger.util";
import { comparePassword, hashPassword } from "../../utils/password.util";
import { AuthService } from "../auth.service";
import { LoginDto } from "../../dtos/auth/request/login.dto";
import { AuthResponseDto } from "../../dtos/auth/response/auth-response.dto";
import { generateAccessToken, generateRefreshToken } from "../../utils/token.util";

export class AuthServiceimpl implements AuthService{
    async login(data: LoginDto): Promise<AuthResponseDto> {

        logger.debug(`
            Attempting to login for email: ${data.email}`);

        logger.debug(
            `Attempting to login for identifier: ${data.email} || ${data.userName}`);

            let user;
            if (data.email) {
                user = await db.user.findUnique({where: {email: data.email} });
            } else if (data.userName){
                user = await db.user.findUnique({where: {userName: data.userName}});
            } else{
                throw new AppError("Either email or username must be provided", 400);
            }
        
            if (!user){
                throw new AppError("invalid credendials", 401);
            }

            const isPasswordValid = await comparePassword(data.password, user.password);
            if(!isPasswordValid) {
                throw new AppError("inavalid credentials", 401);
            } 
            const accessToken =  generateAccessToken({sub: user.id, role: user.role});
            const refreshToken = generateRefreshToken({sub: user.id});

            return{
                accessToken,
                refreshToken,
                email: user.email,
                role: user.role,
            }
    }
    async createUser(data: SignUpDto): Promise<UserResponseDTO> {
        logger.debug(`Attempting to create user with email: ${data.email}`)
        const existingUser = await db.user.findUnique({
            where: {email: data.email},
        })
        if (existingUser){
            throw new AppError("Email already in use", 409);
        }

        const hashedPassword = await hashPassword(data.password);
        const newUser = await db.user.create({
            data:{
                email: data.email,
                userName: data.userName,
                password: hashedPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                role: Role.USER,
                
            },
            select:{
                id: true,
                userName:true,
                email: true,
                firstName: true,
                lastName: true,
                role:true,
                createdAt: true,
                updatedAt: true,
            },
        });

        logger.info(`User Created succesfully: ${newUser.id}`)
        return newUser;
        
    }
    
}