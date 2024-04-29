import { IsNumber, IsString } from "class-validator";

export class CreateServiceDto {
    @IsString()
    name:string;

    @IsNumber()
    hourlyRate:number;

    @IsString()
    description:string;

}
