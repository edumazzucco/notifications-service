import { Notification } from '../entities/notification';
import { SendNotification } from './send-notification';

const notificationsRepository = {
  async create(notification: Notification) {
    return Promise.resolve();
  },
};

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification(notificationsRepository);
    const response = await sendNotification.execute({
      recipientId: '123',
      content: 'Hello world!',
      category: 'new_user',
    });
    expect(response.notification).toBeTruthy();
  });
});
