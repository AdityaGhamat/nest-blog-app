import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    /*
    Injecting Repository
    */

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  public async createUser(createUserDto: CreateUserDTO) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);

    return newUser;
  }
  public async findAll() {}
  public async findById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
