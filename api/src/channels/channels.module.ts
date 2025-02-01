import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channel.entity';
import { ChannelMessagesService } from '../channel-messages/channel-messages.service';
import { ChannelMessage } from '../channel-messages/channel-message.entity';
import { ChannelMessagesGateway } from 'src/channel-messages/channel-messages.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channel, 
      ChannelMessage
    ]),
  ],
  providers: [
    ChannelsService,
    ChannelMessagesService,
    ChannelMessagesGateway
  ],
  controllers: [ChannelsController]
})
export class ChannelsModule {}
