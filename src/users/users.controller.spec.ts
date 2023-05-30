import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordModule } from '../password/password.module';

describe('usersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [PasswordModule],
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: Model,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  test('controller is defined', async () => {
    expect(usersController).toBeDefined();
  });
});
