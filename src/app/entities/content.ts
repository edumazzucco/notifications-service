export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return content.length <= 255 && content.length >= 5;
  }

  constructor(content: string) {
    if (!this.validateContentLength(content)) {
      throw new Error(
        'Invalid content length, must be between 5 and 255 characters',
      );
    }

    this.content = content;
  }
}
