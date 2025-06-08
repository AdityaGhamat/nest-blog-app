import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDTO } from '../dto/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request, response } from 'express';
import { PaginationInterface } from '../interface/pagination.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    /*
    Injecting Request from express
    */
    @Inject(REQUEST)
    private readonly requestProvider: Request,
  ) {}
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDTO,
    repository: Repository<T>,
  ): Promise<PaginationInterface<T>> {
    const result = await repository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.page,
      take: paginationQuery.limit,
    });

    //constructing urls
    const baseUrl =
      this.requestProvider.protocol +
      '://' +
      this.requestProvider.headers.host +
      '/';

    const newURl = new URL(this.requestProvider.url, baseUrl);

    //calculating total pages
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);
    const currentPage = paginationQuery.page;

    const nextPage = currentPage >= totalPages ? currentPage : currentPage + 1;
    const previousPage = currentPage <= 1 ? 1 : currentPage - 1;

    const finalResponse: PaginationInterface<T> = {
      data: result,
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalItems: totalItems,
        currentPage: paginationQuery.page,
        totalPages: totalPages,
      },
      links: {
        first: `${newURl.origin}${newURl.pathname}?limit=${paginationQuery.limit}&page=1`,
        last: `${newURl.origin}${newURl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
        current: `${newURl.origin}${newURl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
        next: `${newURl.origin}${newURl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
        previous: `${newURl.origin}${newURl.pathname}?limit=${paginationQuery.limit}&page=${previousPage}`,
      },
    };
    return finalResponse;
  }
}
