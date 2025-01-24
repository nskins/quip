import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Channel } from './channel.entity';
import { ChannelsService } from './channels.service';
import { ChannelMessagesService } from '../channel-messages/channel-messages.service';

@Controller('channels')
export class ChannelsController {

    constructor(
        private channelsService : ChannelsService,
        private channelMessagesService : ChannelMessagesService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getAll(): Promise<Channel[]> {
        return await this.channelsService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/messages')
    async getChannelMessagesBlock(@Param('id') id : number, @Query('timestamp') timestamp : Date) {
        return await this.channelMessagesService.getMessageBlock(id, timestamp)
    }
}
