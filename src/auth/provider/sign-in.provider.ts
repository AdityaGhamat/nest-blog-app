import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from 'src/users/provider/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { User } from 'src/users/entity/user.entity';
import { SignInDTO } from '../dto/signin.dto';
import { ActiveUserInterface } from '../interface/active-user.interface';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    private readonly hashProvider: HashingProvider,

    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  public async signIn(signInDto: SignInDTO) {
    let user: undefined | User;
    let password;
    user = await this.userService.findByEmail(signInDto.email);
    password = await this.hashProvider.comparePassword(
      signInDto.password,
      user.password,
    );
    if (!password) {
      throw new BadRequestException('Failed to sign in', {
        description: 'Either email or password is incorrect.',
      });
    }

    const accesstoken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      } as ActiveUserInterface,
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTTL,
      },
    );
    return { accesstoken };
  }
}
