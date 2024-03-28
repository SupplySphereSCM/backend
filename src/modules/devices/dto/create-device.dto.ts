import {IsString} from 'class-validator';
  
export class CreateDeviceDto {
    

    @IsString()
    device_id:string;

    
}
