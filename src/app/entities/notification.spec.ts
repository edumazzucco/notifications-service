import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: '123',
      content: new Content('Hello world!'),
      category: 'new_user',
    });
    expect(notification).toBeTruthy();
  });

  it('should be able to set a notification as read', () => {
    const notification = new Notification({
      recipientId: '123',
      content: new Content('Hello world!'),
      category: 'new_user',
    });
    notification.read();
    expect(notification.readAt).toBeTruthy();
  });
});
