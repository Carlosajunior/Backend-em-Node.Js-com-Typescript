import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDTO extends CreateUserDTO {
  @ApiProperty({
    type: Boolean
  })
  @IsBoolean()
  is_active: boolean;
}
