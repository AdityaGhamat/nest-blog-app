import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDTO } from './dto/signin.dto';
import { AuthService } from './provider/auth.service';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
@Controller('auth')
export class AuthController {
  constructor(
    /*
        Injecting auth service
        */
    private readonly authService: AuthService,
  ) {}

  @Auth(AuthType.None)
  @Post()
  @HttpCode(HttpStatus.OK)
  public async SignIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto);
  }
}
