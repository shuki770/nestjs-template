import { IsString, IsOptional, IsArray, IsInt, IsPositive, Min, IsBoolean } from 'class-validator';
import { Expose, Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class QeuryUserRequestDto {
  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Query to search users', required: false })
  public q?: string;

  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ description: 'selected fields', required: false, type: String, isArray: true })
  public projection?: Array<keyof UserDto>;

  @Expose()
  @Transform((str: string) => str?.split(',').map(str => str.trim()))
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({
    description: 'fields to sort by',
    required: false,
    enum: [],
  })
  public sort?: string[];

  @Expose()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'How many records to fetch in this query', required: false })
  public limit?: number;

  @Expose()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ description: 'How many records to skip', required: false })
  public skip?: number;

  @Expose()
  @Transform(str => str === 'true' || str === '1')
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Include total count on response', required: false })
  public includeTotal?: boolean;
}
