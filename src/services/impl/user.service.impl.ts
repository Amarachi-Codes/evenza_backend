import { Role } from "@prisma/client";
import { db } from "../../config/db";
import { SignUpDto } from "../../dtos/user/request/create-user.dto";
import { UserResponseDTO } from "../../dtos/user/response/user-response-dto";
import { AppError } from "../../exception/AppError";
import { hashPassword } from "../../utils/password.util";
import { UserService } from "../user.service";
import { logger } from "../../utils/logger.util";

export class UserServiceImpl implements UserService {
  async deleteUser(userId: number): Promise<void> {
    logger.debug(`deleting user with id: ${userId}`);
    try {
      const deleteUser = await db.user.delete({
      where: {id: userId}
    })
    logger.info(`user sucessfully deleted: ${userId}`)
    } catch (error:any) {
      if (error.code === "P2025") {
        logger.warn(`Attempted to delete non-existent user: ${userId}`);
        throw new AppError("User not found", 404);
      }
      logger.error(`Error deleting user: ${error.message}`, error);
      throw new AppError("Unable to delete user", 500);
    }
    }
    
   
  
  async getAllUser(): Promise<UserResponseDTO[]> {
    logger.debug("Fetching all users")
    const users = await db.user.findMany({})
    
    logger.info(`Fetched ${users.length} users`)
    
    return users
    
  }
  async getUserById(userId: number): Promise<UserResponseDTO | null> {
    const userIdFound = await db.user.findUnique({
      where: {id: userId}
    })
    if(!userIdFound){
      logger.warn(`user not found with Id: ${userId}`);
      return null;
    } logger.info(`user fetched succesfully:${userId}`);
    return userIdFound
   
  }
  async createUser(data: SignUpDto): Promise<UserResponseDTO> {
    const userFound = await db.user.findUnique({
      where: { email: data.email },
    });
    if (userFound) {
      throw new AppError("Email already exist", 409);
    }
    const hashedPassword = await hashPassword(data.password);
    const newUser = await db.user.create({
      data: {
        email: data.email,
        userName: data.userName,
        password: data.hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        role: Role.USER,
      },
    });

    return {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }
}
