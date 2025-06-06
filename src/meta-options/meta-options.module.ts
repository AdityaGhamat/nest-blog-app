import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { MetaOptionsService } from './provider/meta-options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './entity/meta-option.entity';

@Module({
  controllers: [MetaOptionsController],
  providers: [MetaOptionsService],
  imports: [TypeOrmModule.forFeature([MetaOption])],
})
export class MetaOptionsModule {}
