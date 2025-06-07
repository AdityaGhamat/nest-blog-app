import { Injectable } from '@nestjs/common';
import { PaginationQueryDTO } from '../dto/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class PaginationProvider {
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDTO,
    repository: Repository<T>,
  ) {
    const result = await repository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.page,
      take: paginationQuery.limit,
    });
    return result;
  }
}
