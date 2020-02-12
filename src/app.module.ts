import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { config } from './config';

@Module({
  imports: [CommonModule, CoreModule, UserModule, TypegooseModule.forRoot(config.dataAccess.uri, config.dataAccess.options)],
  controllers: [],
  providers: [],
})
export class AppModule {}
