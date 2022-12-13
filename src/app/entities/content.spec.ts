import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Hello world!');
    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('1234')).toThrowError(
      'Invalid content length, must be between 5 and 255 characters',
    );
  });

  it('should not be able to create a notification content with more than 255 characters', () => {
    const content = new Array(257).join('a');
    expect(() => new Content(content)).toThrowError(
      'Invalid content length, must be between 5 and 255 characters',
    );
  });
});
