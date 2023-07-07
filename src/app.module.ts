import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveDirectoryModule } from './active-directory/active-directory.module';

@Module({
  imports: [ActiveDirectoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
