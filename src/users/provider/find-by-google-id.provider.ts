import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { FindByGoogleDTO } from '../dto/find-by-google-id.dto';

@Injectable()
export class FindByGoogleIdProvider {
  constructor(
    /**
     * Injecting User repository
     */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  public async findByGoogleId(findByGoogleIdDto: FindByGoogleDTO) {
    let user: User | undefined;
    try {
      user = await this.userRepository.findOneBy({
        googleId: findByGoogleIdDto.googleId,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
    if (!user) {
      throw new BadRequestException('User does not exists', {
        description:
          'The user you are trying to login with google does not exists yet.',
      });
    }
    return user;
  }
}
