import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { BcryptProvider } from 'src/auth/provider/bcrypt.provider';
@Injectable()
export class CreateUserProvider {
  constructor(
    /*
        Injecting user repository
        */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    /*
     Injecting bcrypt provider
     */
    private readonly bcryptProvider: BcryptProvider,
  ) {}
  public async createUser(createUserDto: CreateUserDTO) {
    let existingUser = undefined;
    try {
      existingUser = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (existingUser) {
      throw new ConflictException('User is already exists in the database', {
        description: 'Please signup with another email',
      });
    }
    let newUser;
    try {
      const password = await this.bcryptProvider.hashPassword(
        createUserDto.password,
      );
      newUser = this.userRepository.create({ ...createUserDto, password });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!newUser) {
      throw new BadRequestException('Failed to create new user', {
        description: 'Something went wrong while creating user',
      });
    }
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
}
