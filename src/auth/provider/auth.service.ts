import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { SignInDTO } from '../dto/signin.dto';
import { UsersService } from 'src/users/provider/users.service';
import { User } from 'src/users/entity/user.entity';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    /*
     *Injecting userserivce
     */
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    /**
     * Injecting hashingProvider
     */
    private readonly hashProvider: HashingProvider,
    /**
     * Injecting jwtService
     */
    private readonly jwtService: JwtService,

    /**
     * Injecting jwtconfiguration
     */
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
      },
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
