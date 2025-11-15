import { Role } from "@prisma/client";
import { Trim } from "class-sanitizer";
import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";

export class SignUpDto{
    @IsEmail()
    @Transform(({value})=> value.toLowerCase())
    @Trim()
    email!:string;
    
    @IsNotEmpty()
    @MinLength(6)
    password!:string;

    @IsNotEmpty()
    @Trim()
    userName!:string;

    @IsNotEmpty()
    @Trim()
    firstName!:string;

    @IsNotEmpty()
    @Trim()
    lastName!:string;

    @IsNotEmpty()
    role!: Role;
    hashedPassword: any;

}