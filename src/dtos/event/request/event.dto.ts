import { Trim } from "class-sanitizer";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class EventDto{
    @IsNotEmpty()
    @IsString()
    @Trim()
    title!: string;

    @IsOptional()
    @IsString()
    description?:string;

    @IsNotEmpty()
    @Transform(({value})=>{
        const date = new Date(value);
        if (isNaN(date.getTime())){
            throw new Error("Invalid date format");
        }
        return date;
    })
    @IsDate()
    date!:Date;

    @IsNotEmpty()
    @IsString()
    location!: string;

}