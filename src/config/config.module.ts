import { Global, Module } from '@nestjs/common';

import { yarConfigService } from './config.service';

@Global()
@Module({
  providers: [
    {
      provide: yarConfigService,
      useValue: new yarConfigService(),
    },
  ],
  exports: [yarConfigService],
})
export class ConfigModule {}
