import { Module } from '@nestjs/common';
import { ChannelMessagesService } from './channel-messages.service';
import { ChannelMessage } from './channel-message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelMessage])
  ],
  providers: [ChannelMessagesService]
})
export class ChannelMessagesModule {}
