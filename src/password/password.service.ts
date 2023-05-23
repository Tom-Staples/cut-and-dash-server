import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPassword(pass: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(pass, salt);
    return hash;
  }

  async comparePassword(pass: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(pass, hash);
    return isMatch;
  }
}
