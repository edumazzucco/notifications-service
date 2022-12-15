import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: '123',
    content: new Content('Hello world!'),
    category: 'new_user',
    ...override,
  });
}
