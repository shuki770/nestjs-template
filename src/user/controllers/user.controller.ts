import { Controller, Get, Post, Param, Body, Query, Put, Delete, NotFoundException } from '@nestjs/common';
import { UserDto, CreateUserRequestDto, UpdateUserRequestDto } from '../dto';
import { UserService } from '../services/user.service';
import { QeuryUserRequestDto } from '../dto/query-user.request.dto';
import { QeuryUserResponseDto } from '../dto/query-user.response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {

  constructor(private userService: UserService) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserDto> {
    const user: UserDto = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException(`The user ${id} not found`);
    }

    return user;
  }
  
  @Get()
  async find(@Query() req?: QeuryUserRequestDto): Promise<QeuryUserResponseDto> {
    return this.userService.find(req);
  }

  @Post()  
  async create(@Body() createUserDto: CreateUserRequestDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserRequestDto): Promise<UserDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}