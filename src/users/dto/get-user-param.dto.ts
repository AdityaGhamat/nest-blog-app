import { Type } from 'class-transformer';
import { IsOptional, IsInt } from 'class-validator';

export class GetUserParamDTO {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
