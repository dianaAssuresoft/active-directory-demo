import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActiveDirectoryModule } from './active-directory/active-directory.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ActiveDirectoryModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
