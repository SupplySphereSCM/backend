import { IsNumber, IsString } from "class-validator"

export class verifySignatureDto{
    @IsString()
    jwt:string

    @IsString()
    hash:string

    @IsString()
    signature:string

}