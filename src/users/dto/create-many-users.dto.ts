import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';
import { Type } from 'class-transformer';

export class CreateManyUserDTO {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDTO)
  user: CreateUserDTO[];
}
