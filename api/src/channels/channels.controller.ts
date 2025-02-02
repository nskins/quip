import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Channel } from './channel.entity';
import { ChannelsService } from './channels.service';
import { ChannelMessagesService } from '../channel-messages/channel-messages.service';
import { ChannelMessagesGateway } from 'src/channel-messages/channel-messages.gateway';
import { CurrentUser } from 'src/current-user.decorator';
import { User } from 'src/users/user.entity';

type CreateMessageBody = {
    text : string
}

@Controller('channels')
export class ChannelsController {

    constructor(
        private channelsService : ChannelsService,
        private channelMessagesService : ChannelMessagesService,
        private channelMessagesGateway : ChannelMessagesGateway
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getAll(): Promise<Channel[]> {
        return await this.channelsService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/messages')
    async getChannelMessagesBlock(@Param('id') id : number, @Query('timestamp') timestamp : Date) {
        return await this.channelMessagesService.getBlock(id, timestamp);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/messages')
    async createChannelMessage(
        @Param('id') id : number,
        @Body() body : CreateMessageBody,
        @CurrentUser() user : User) {
            
            const message = await this.channelMessagesService.create({
                channelId: id,
                userId: user.id,
                text: body.text
            });

            this.channelMessagesGateway.emitMessageCreated(message);

            return message;
        }
}
