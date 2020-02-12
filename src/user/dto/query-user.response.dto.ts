import { UserDto } from './user.dto';

export class QeuryUserResponseDto {
  public total?: number;
  public users: UserDto[];
}
