import { SignUpDto } from "../dtos/user/request/create-user.dto";
import { UserResponseDTO } from "../dtos/user/response/user-response-dto";

export interface UserService{
    getUserById(userId: number):Promise<UserResponseDTO | null>;
    getAllUser():Promise<UserResponseDTO []>;
    deleteUser(userId: number):Promise<void>;
}