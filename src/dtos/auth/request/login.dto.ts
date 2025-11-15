import { Trim } from "class-sanitizer";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, ValidateIf } from "class-validator";

export class LoginDto{
    @IsOptional()
    @IsEmail()
    @Transform(({value})=> value?.toLowerCase())
    @Trim()
    email?: string;
    @IsOptional()
    @IsNotEmpty()
    @Transform(({value})=> value?.toLowerCase())
    @Trim()
    userName?: string;

    @IsNotEmpty()
    password!: string;

    @ValidateIf((o) => !o.email && !o.userName)
    @IsNotEmpty({message: "Either email or username must be provided" })
    private _dummy?: string;  // Dummy field to enforce at least one identifier
}