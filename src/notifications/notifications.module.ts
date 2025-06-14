import { Module } from '@nestjs/common';
import { NotificationsControllerController } from './notifications.controller';

@Module({
  controllers: [NotificationsControllerController],
})
export class NotificationsModule {}
