import { PrismaClient } from "@prisma/client";

declare global{

var __db: PrismaClient | undefined;

}

const db = global.__db?? new PrismaClient();
if (process.env.NODE_ENV ==='development'){
    global.__db = db;

}
export {db}