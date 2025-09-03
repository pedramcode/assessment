import { Global, Module } from '@nestjs/common';
import SettingService from './services/setting.service';

@Global()
@Module({
  providers: [SettingService],
  exports: [SettingService],
})
export class CommonModule {}
