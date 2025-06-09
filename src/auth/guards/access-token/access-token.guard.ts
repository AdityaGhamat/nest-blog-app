import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import jwtConfig from 'src/auth/config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /**
     * Injecting jwtservice
     */
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // extract the request from execution context
    const request = context.switchToHttp().getRequest();
    //extract the token from header
    const token = this.extractRequestFromHeader(request);
    //validate the token
    if (!token) {
      throw new UnauthorizedException('Request token is not valid');
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      console.log(payload);
      request[REQUEST_USER_KEY] = payload;
    } catch (error) {
      throw new UnauthorizedException('unauthorized');
    }
    return true;
  }
  private extractRequestFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
