export interface NotificationProps {
  recipientId: string;
  content: string;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps;

  constructor(props: NotificationProps) {
    this.props = props;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get category(): string {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get readAt(): Date | null {
    return this.props.readAt;
  }

  public set readAt(readAt: Date | null) {
    this.props.readAt = readAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get content(): string {
    return this.props.content;
  }

  public set content(content: string) {
    if (content.length > 255) {
      throw new Error('Content is too long');
    } else if (content.length < 5) {
      throw new Error('Content is too short');
    }

    this.props.content = content;
  }
}
