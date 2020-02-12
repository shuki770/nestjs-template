import { IsString, IsOptional, IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateUserRequestDto {

  @Expose()
  @IsString()
  @IsOptional()
  public readonly username?: string;

  @Expose()
  @IsEmail()
  @IsOptional()
  public readonly email?: string;

  @Expose()
  @IsString()
  @IsOptional()
  public readonly displayName?: string;

  @Expose()
  @IsString()
  @IsOptional()
  public readonly firstName?: string;

  @Expose()
  @IsString()
  @IsOptional()
  public readonly lastName?: string;
}
