import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification();
    const response = await sendNotification.execute({
      recipientId: '123',
      content: 'Hello world!',
      category: 'new_user',
    });
    expect(response.notification).toBeTruthy();
  });
});
