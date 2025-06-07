import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';
import { DataSource } from 'typeorm';
@Injectable()
export class CreateManyUsersProvider {
  constructor(
    /**
     * Injecting Datasource
     */
    private readonly datasource: DataSource,
  ) {}
  public async createMany(createUserDto: CreateUserDTO[]) {
    let newUsers: User[] = [];
    //create query runner instance
    const queryRunner = this.datasource.createQueryRunner();
    //connect query runner instance to database
    await queryRunner.connect();
    //start transaction
    await queryRunner.startTransaction();
    try {
      for (let user of createUserDto) {
        const newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      //if sucessfull comit
      await queryRunner.commitTransaction();
      return newUsers;
    } catch (error) {
      //if unsucessfull rollback
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
