import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPassword(pass: string): Promise<string> {
    if (typeof pass !== 'string') {
      return null;
    }
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(pass, salt);
      return hash;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create password');
    }
  }

  async comparePassword(pass: string, hash: string): Promise<boolean> {
    if (typeof pass !== 'string' || typeof hash !== 'string') {
      return false;
    }
    try {
      const isMatch = await bcrypt.compare(pass, hash);
      return isMatch;
    } catch (error) {
      throw new InternalServerErrorException('Cannot compare passwords');
    }
  }
}
