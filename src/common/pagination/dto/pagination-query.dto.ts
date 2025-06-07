import { IsOptional, IsPositive, MaxLength } from 'class-validator';
export class PaginationQueryDTO {
  @IsOptional()
  @IsPositive()
  limit?: number = 10;
  @IsOptional()
  @IsPositive()
  page?: number = 1;
}
