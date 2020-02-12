import { Injectable } from '@nestjs/common';
import { QeuryUserRequestDto } from '../dto/query-user.request.dto';
import { UserDto, CreateUserRequestDto, UpdateUserRequestDto } from '../dto';
import { UserModel } from '../models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { FilterQuery } from 'mongodb';
import { QeuryUserResponseDto } from '../dto/query-user.response.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly model: ReturnModelType<typeof UserModel>) {}

  async findById(id: string): Promise<UserDto> {
    const user = await this.model.findById(id);

    return user?.toJSON();
  }

  async find(req: QeuryUserRequestDto): Promise<QeuryUserResponseDto> {
    const { q, skip, limit, includeTotal, sort, projection } = req;
    const mongoQuery: FilterQuery<UserDto> = {};

    if (q) {
      mongoQuery.$or = [{ email: { $regex: q } }, { username: { $regex: q } }, { displayName: { $regex: q } }];
    }

    const docs = await this.model
      .find(mongoQuery)
      .select(projection)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const res: QeuryUserResponseDto = { users: docs.map(doc => doc.toJSON()) };

    if (includeTotal) {
      res.total = await this.model.countDocuments(mongoQuery);
    }

    return res;
  }

  async create(createUserDto: CreateUserRequestDto): Promise<UserDto> {
    const createdUser = await this.model.create(createUserDto);

    return createdUser.toJSON();
  }

  async update(id: string, updateUserDto: UpdateUserRequestDto): Promise<UserDto> {
    const updatedUser = await this.model.findByIdAndUpdate(id, updateUserDto, { new: true });

    return updatedUser?.toJSON();
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id });
  }
}
