import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  @Length(5, 255)
  content: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsUUID()
  recepientId: string;
}
