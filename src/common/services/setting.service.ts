import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class SettingService {
  constructor(private readonly configService: ConfigService) {}

  public get database_host(): string {
    return this.configService.get('DATABASE_HOST') ?? '';
  }

  public get database_port(): number {
    return this.configService.get<number>('DATABASE_PORT') ?? 5432;
  }

  public get database_user(): string {
    return this.configService.get('DATABASE_USER') ?? '';
  }

  public get database_password(): string {
    return this.configService.get('DATABASE_PASSWORD') ?? '';
  }

  public get database_name(): string {
    return this.configService.get('DATABASE_NAME') ?? '';
  }

  public get environment(): 'dev' | 'prod' {
    return this.configService.get('ENVIRONMENT') === 'dev' ? 'dev' : 'prod';
  }

  public get redis_url(): string {
    return this.configService.get('REDIS_URL') ?? '';
  }
}
