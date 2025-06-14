import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    /**
     * Injecting mailer servcie
     */
    private readonly mailerService: MailerService,
    /**
     * Injecting config service
     */
    private readonly configService: ConfigService,
  ) {}
  public async sendUserWelcome(user: User): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: this.configService.get('appConfig.nodemailer_user'),
      subject: `Welcome to NestJs Blog`,
      template: './welcome',
      context: {
        name: user.firstname,
        email: user.email,
        loginUrl: 'http://localhost:3000',
      },
    });
  }
}
