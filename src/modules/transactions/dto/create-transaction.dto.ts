import { IsString } from "class-validator";

export class CreateTransactionDto {

    @IsString()
    transaction_id:string;

    @IsString()
    device_id:string;
}
