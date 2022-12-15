import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipients notifications', () => {
  it('should be able to get notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const response1 = await getRecipientNotifications.execute({
      recipientId: '123',
    });

    const response2 = await getRecipientNotifications.execute({
      recipientId: '1234',
    });

    const response3 = await getRecipientNotifications.execute({
      recipientId: '12345',
    });

    expect(response1.notifications).toEqual([notification1]);
    expect(response2.notifications).toEqual([notification2, notification3]);
    expect(response3.notifications).toEqual([]);
  });
});
