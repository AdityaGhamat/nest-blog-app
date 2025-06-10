import { Controller } from '@nestjs/common';
import { GoogleAuthenticationService } from './providers/google-authentication.service';

@Controller('google-authentication')
export class GoogleAuthenticationController {
  constructor(
    /**
     * Injecting googleauthenticationprovider
     */
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}
  public async authenticate() {}
}
