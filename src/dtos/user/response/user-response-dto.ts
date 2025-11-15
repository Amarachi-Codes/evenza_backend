import { Role } from "@prisma/client";

export class UserResponseDTO{
    id!: number;
    email!:string;
    firstName!:string | null;
    lastName!:string | null;
    role!:Role;
    createdAt!:Date;
    updatedAt!:Date;
}