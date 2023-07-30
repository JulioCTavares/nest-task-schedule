import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/notifications')
export class NotificationController {
  constructor(
    @Inject('NOTIFICATION') private readonly notificationClient: ClientProxy,
  ) { }

  @Get('/send-notifications')
  msNotification() {
    this.notificationClient.emit('task_notification', 'Olá Teste');
  }
}
