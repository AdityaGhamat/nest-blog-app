import { Injectable } from '@nestjs/common';
import { CreateTagDTO } from '../dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entity/tag.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    /*
        Injecting Tag Repository
        */

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}
  public async createTag(createTagDto: CreateTagDTO) {
    const tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }
  public async findMultipleTags(tags: number[]) {
    const result = await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });

    return result;
  }
  public async softDeleteTag(id: number) {
    await this.tagRepository.softDelete(id);
    return { deleted: true, id };
  }
}
