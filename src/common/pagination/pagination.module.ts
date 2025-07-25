import { Module } from '@nestjs/common';
import { PaginationProvider } from './proivder/pagination.provider';
@Module({
  providers: [PaginationProvider],
  exports: [PaginationProvider],
})
export class PaginationModule {}
