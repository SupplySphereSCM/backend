import { IsNumber, IsString } from "class-validator";

export class CreateServiceDto {
    @IsString()
    user_id:string;

    @IsString()
    Product_id:string;

}
