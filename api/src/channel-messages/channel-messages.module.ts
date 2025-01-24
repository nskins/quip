import { Module } from '@nestjs/common';
import { ChannelMessagesService } from './channel-messages.service';

@Module({
  providers: [ChannelMessagesService]
})
export class ChannelMessagesModule {}
