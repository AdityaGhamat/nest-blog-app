import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateManyUsersProvider } from './create-many-users.provider';

@Injectable()
export class UsersService {
  constructor(
    /*
    Injecting Repository
    */

    @InjectRepository(User)
    private userRepository: Repository<User>,

    /*
    Inject createManyUsersProvider
    */
    private readonly createManyUserProvider: CreateManyUsersProvider,
  ) {}

  //creating a user
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
      throw new BadRequestException('User is already exists in the database', {
        description: 'Please signup with another email',
      });
    }
    let newUser;
    try {
      newUser = this.userRepository.create(createUserDto);
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
  public async findAll() {}

  //finding user by id
  public async findById(id: number) {
    let user: User;
    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!user) {
      throw new NotFoundException('User did not found', {
        description: 'User did not found with the id',
      });
    }
    return user;
  }

  public async createMany(createUserDto: CreateUserDTO[]) {
    return await this.createManyUserProvider.createMany(createUserDto);
  }
}
