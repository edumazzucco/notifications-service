import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
  it('should be able to count notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const notification1 = makeNotification({
      recipientId: '123',
    });

    const notification2 = makeNotification({
      recipientId: '1234',
    });

    const notification3 = makeNotification({
      recipientId: '1234',
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
