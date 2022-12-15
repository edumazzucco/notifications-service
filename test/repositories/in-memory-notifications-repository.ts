import { Notification } from '../../src/app/entities/notification';
import { NotificationsRepository } from '../../src/app/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification> {
    const notification = this.notifications.find(
      (n) => n.id === notificationId,
    );

    if (!notification) {
      return null;
    }
    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex((n) => n.id === notification.id);

    if (index >= 0) {
      this.notifications[index] = notification;
    }
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
