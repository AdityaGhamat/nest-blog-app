import { IsDate, IsOptional } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDTO } from 'src/common/pagination/dto/pagination-query.dto';
class GetPostsBaseDTO {
  @IsDate()
  @IsOptional()
  startDate?: Date;
  @IsDate()
  @IsOptional()
  endDate?: Date;
}
export class GetPostsDTO extends IntersectionType(
  GetPostsBaseDTO,
  PaginationQueryDTO,
) {}
