import { Injectable } from '@nestjs/common';
import { Channel } from './channel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelsService {
    constructor(@InjectRepository(Channel) private ChannelRepository : Repository<Channel>) {}

    async getAll(): Promise<Channel[]>{
        return await this.ChannelRepository.find();
    }
}
