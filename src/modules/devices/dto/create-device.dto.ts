import {IsString} from 'class-validator';
  
export class CreateDeviceDto {
    @IsString()
    user_id:string;

    @IsString()
    device_id:string;

    
}
