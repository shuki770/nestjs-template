import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
    .overrideProvider(UserService)
    .useValue({})
    .compile();

    userController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('toBeDefined', () => {
      expect(userController).toBeDefined();
    });
  });
});
