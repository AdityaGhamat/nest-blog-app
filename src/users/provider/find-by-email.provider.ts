import {
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/provider/hashing.provider';

@Injectable()
export class FindByEmailProvider {
  constructor(
    /**
     * Injecting user repository
     */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    /**
     * Injecting hasing provider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}
  public async findUserByEmail(email: string) {
    let emailCheck: undefined | User;
    let passwordCheck;
    try {
      emailCheck = await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!emailCheck) {
      throw new NotFoundException('User not found', {
        description:
          'User with this email is not registered with the platform yet',
      });
    }
    return emailCheck;
  }
}
