import { Test } from '@nestjs/testing';
import { PasswordService } from './password.service';
import * as bcrypt from 'bcrypt';

const mockBcrypt = (pass, hash) => {
  return pass === hash;
};

describe('PasswordService', () => {
  let passwordService: PasswordService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    passwordService = module.get<PasswordService>(PasswordService);
  });

  describe('hashPassword', () => {
    test('return a hashed string password', async () => {
      const response = await passwordService.hashPassword('pass');
      expect(response).toBeTruthy();
      expect(typeof response).toEqual('string');
    });
    test('return null if password is not formatted correctly', async () => {
      const response = await passwordService.hashPassword({
        pass: 'pass',
      } as any);
      expect(response).toBeNull();
    });
  });
  describe('comparePassword', () => {
    beforeEach(() => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(mockBcrypt);
    });

    test('return true if match', async () => {
      const response = await passwordService.comparePassword('pass', 'pass');

      expect(response).toBeTruthy();
    });
    test('return false if no match', async () => {
      const response = await passwordService.comparePassword('pass', 'noPass');
      expect(response).toBeFalsy();
    });
    test('return false if params are not formatted correctly', async () => {
      const response = await passwordService.comparePassword(
        { pass: 'pass' } as any,
        { hash: 'pass' } as any,
      );
      expect(response).toBeFalsy();
    });
  });
});
