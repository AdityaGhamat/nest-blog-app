import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';
@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt();
    const password = bcrypt.hash(data, salt);
    return password;
  }
  comparePassword(
    data: string | Buffer,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(data, encryptedPassword);
  }
}
