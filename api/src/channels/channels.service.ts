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

    async getChannelByName(name : string) : Promise<Channel> {
        const results = await this.ChannelRepository.find({
            where: {
                name: name
            }
        });

        return results.length > 0 ? results[0] : null;
    }
}
