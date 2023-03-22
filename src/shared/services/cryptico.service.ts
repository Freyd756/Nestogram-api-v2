import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto-js';

@Injectable()
export class CrypticoService {
  public constructor(private readonly _configService: ConfigService) {}

  public async encrypt(text: string): Promise<string> {
    try {
      const secret =
        (await this._configService.get('SECRET')) || process.env.SECRET;
      const result = crypto.AES.encrypt(text, secret).toString();
      return result;
    } catch (error) {
      return error;
    }
  }
  // tslint:disable-next-line: no-any
  public async decrypt(text: string): Promise<any> {
    try {
      const secret =
        (await this._configService.get('SECRET')) || process.env.SECRET;
      const bytes = crypto.AES.decrypt(text, secret);
      const result = bytes.toString(crypto.enc.Utf8);
      return JSON.parse(result);
    } catch {
      return null;
    }
  }
}
