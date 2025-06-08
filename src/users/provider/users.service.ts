import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateManyUsersProvider } from './create-many-users.provider';
import { CreateManyUserDTO } from '../dto/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindByEmailProvider } from './find-by-email.provider';

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

    /*
    Injecting createUserProvider
    */
    private readonly createUserProvider: CreateUserProvider,

    /**
     * Injecting findByEmailProvider
     */
    private readonly findByEmailProvider: FindByEmailProvider,
  ) {}

  //creating a user
  public async createUser(createUserDto: CreateUserDTO) {
    return this.createUserProvider.createUser(createUserDto);
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

  public async findByEmail(email: string) {
    return await this.findByEmailProvider.findUserByEmail(email);
  }

  public async createMany(createUsersDto: CreateManyUserDTO) {
    return await this.createManyUserProvider.createMany(createUsersDto);
  }
}
