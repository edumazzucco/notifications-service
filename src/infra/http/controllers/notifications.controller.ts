import { CancelNotification } from '@app/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/use-cases/get-recipient-notifications';
import { ReadNotification } from '@app/use-cases/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });

    return {
      message: 'Notification canceled',
    };
  }

  @Get(':recipientId/count')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Get(':recipientId')
  async getFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ notifications: NotificationViewModel[] }> {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map((notification) =>
        NotificationViewModel.toHTTP(notification),
      ),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });

    return {
      message: 'Notification read',
    };
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });

    return {
      message: 'Notification unread',
    };
  }

  // Read all notifications from the same recipientId
  @Patch(':id/read-all')
  async readAll(@Param('recipientId') recipientId: string) {
    const notifications = await this.getRecipientNotifications.execute({
      recipientId,
    });

    await Promise.all(
      notifications.notifications.map(async (notification) => {
        await this.readNotification.execute({
          notificationId: notification.id,
        });
      }),
    );

    return {
      message: 'All notifications read',
    };
  }
  // Unread all notifications from the same recipientId
  @Patch(':id/unread-all')
  async unreadAll(@Param('recipientId') recipientId: string) {
    const notifications = await this.getRecipientNotifications.execute({
      recipientId,
    });

    await Promise.all(
      notifications.notifications.map(async (notification) => {
        await this.unreadNotification.execute({
          notificationId: notification.id,
        });
      }),
    );

    return {
      message: 'All notifications unread',
    };
  }

  // Create a notification, should return the notification created in the response body
  @Post()
  async create(
    @Body() body: CreateNotificationBody,
  ): Promise<{ notification: NotificationViewModel; oi?: string }> {
    const { notification } = await this.sendNotification.execute({
      recipientId: body.recipientId,
      content: body.content,
      category: body.category,
    });

    const oi = 'oi';

    return {
      notification: NotificationViewModel.toHTTP(notification),
      oi,
    };
  }
}
