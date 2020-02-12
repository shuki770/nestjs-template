import { IsNotEmpty, IsString, IsOptional, IsEmail, IsMongoId } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestDto {

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
