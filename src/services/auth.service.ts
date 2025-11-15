import { LoginDto } from "../dtos/auth/request/login.dto";
import { AuthResponseDto } from "../dtos/auth/response/auth-response.dto";
import { SignUpDto } from "../dtos/user/request/create-user.dto";
import { UserResponseDTO } from "../dtos/user/response/user-response-dto";

export interface AuthService{
createUser(data:SignUpDto):Promise<UserResponseDTO>;

login(data: LoginDto):Promise<AuthResponseDto>;
}