import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { NotificationNotFound } from './errors/notification-not-found';
import { SendNotification } from './send-notification';

describe('Count recipients notifications', () => {
  it('should be able to count notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const notification1 = new Notification({
      recipientId: '123',
      content: new Content('Hello world!'),
      category: 'new_user',
    });

    const notification2 = new Notification({
      recipientId: '1234',
      content: new Content('Hello world!'),
      category: 'new_user',
    });

    const notification3 = new Notification({
      recipientId: '1234',
      content: new Content('Hello world!'),
      category: 'new_user',
    });

    await notificationsRepository.create(notification1);
    await notificationsRepository.create(notification2);
    await notificationsRepository.create(notification3);

    const response1 = await countRecipientNotifications.execute({
      recipientId: '123',
    });

    const response2 = await countRecipientNotifications.execute({
      recipientId: '1234',
    });

    const response3 = await countRecipientNotifications.execute({
      recipientId: '12345',
    });

    expect(response1.count).toEqual(1);
    expect(response2.count).toEqual(2);
    expect(response3.count).toEqual(0);
  });
});
