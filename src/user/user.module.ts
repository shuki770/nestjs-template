import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from './models/user.model';

@Module({
  imports: [TypegooseModule.forFeature([{ typegooseClass: UserModel }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
