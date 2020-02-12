import { IsNotEmpty, IsString, IsOptional, IsEmail, IsMongoId } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserDto {

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public readonly id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

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
