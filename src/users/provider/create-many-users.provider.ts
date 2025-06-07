import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../entity/user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUserDTO } from '../dto/create-many-users.dto';
@Injectable()
export class CreateManyUsersProvider {
  constructor(
    /**
     * Injecting Datasource
     */
    private readonly datasource: DataSource,
  ) {}
  public async createMany(createUsersDto: CreateManyUserDTO) {
    let newUsers: User[] = [];
    //create query runner instance
    const queryRunner = this.datasource.createQueryRunner();
    //connect query runner instance to database
    await queryRunner.connect();
    //start transaction
    try {
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    try {
      for (let user of createUsersDto.user) {
        const newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      //if sucessfull comit
      try {
        await queryRunner.commitTransaction();
      } catch (error) {
        throw new RequestTimeoutException(
          'Unable to process your request at the moment please try later',
          {
            description: 'Error connecting to the database',
          },
        );
      }
    } catch (error) {
      //if unsucessfull rollback
      await queryRunner.rollbackTransaction();
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    } finally {
      await queryRunner.release();
    }
    if (!newUsers || newUsers.length == 0) {
      throw new BadRequestException('Failed to create users');
    }
    return newUsers;
  }
}
