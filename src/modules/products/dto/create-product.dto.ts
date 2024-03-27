import { IsNegative, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    product_id:string;

    @IsString()
    product_name:string;

    @IsNumber()
    quantity:number;

    @IsNumber()
    price:number;
}
