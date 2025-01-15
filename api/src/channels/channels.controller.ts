import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Channel } from './channel.entity';
import { ChannelsService } from './channels.service';

@Controller('channels')
export class ChannelsController {
    constructor(
        private channelsService : ChannelsService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getAll(): Promise<Channel[]> {
        return await this.channelsService.getAll();
    }
}
