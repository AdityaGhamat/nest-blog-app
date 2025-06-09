import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserInterface } from 'src/auth/interface/active-user.interface';
import { TagsService } from 'src/tags/provider/tags.service';
import { Repository } from 'typeorm';
import { CreatePostDTO } from '../dto/create-posts.dto';
import { Post } from '../entity/post.entity';
import { UsersService } from 'src/users/provider/users.service';
@Injectable()
export class CreatePostProvider {
  constructor(
    /**
     * Injecting User service
     */
    private readonly userService: UsersService,
    /**
     * Injecting Tag Service
     */
    private readonly tagService: TagsService,

    /**
     * Injecting post Repository
     */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  public async createPost(
    createPostDto: CreatePostDTO,
    activeUser: ActiveUserInterface,
  ) {
    let author = undefined;
    let tags = undefined;
    try {
      author = await this.userService.findById(activeUser.sub);
      tags = await this.tagService.findMultipleTags(createPostDto.tags);
    } catch (error) {
      throw new BadRequestException(error);
    }
    const publishedOn = new Date();
    const response = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
      publishedOn: publishedOn,
    });
    try {
      return await this.postRepository.save(response);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Ensure post slug is unique and not duplicate',
      });
    }
  }
}
