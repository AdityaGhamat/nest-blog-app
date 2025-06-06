import {
  Controller,
  Body,
  Post,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TagsService } from './provider/tags.service';
import { CreateTagDTO } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Post()
  public async createTag(@Body() createTagDto: CreateTagDTO) {
    return await this.tagService.createTag(createTagDto);
  }

  @Delete('soft-delete')
  public async softDelete(@Query('id', ParseIntPipe) id: number) {
    return await this.tagService.softDeleteTag(id);
  }
}
