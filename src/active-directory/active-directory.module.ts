import { Module } from '@nestjs/common';
import { ActiveDirectoryService } from './active-directory.service';
import { ActiveDirectoryController } from './active-directory.controller';

@Module({
  controllers: [ActiveDirectoryController],
  providers: [ActiveDirectoryService],
})
export class ActiveDirectoryModule {}
