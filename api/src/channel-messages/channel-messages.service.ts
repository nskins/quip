import { Injectable } from '@nestjs/common';
import { ChannelMessage } from './channel-message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

const MessageBlockSize : number = 25

@Injectable()
export class ChannelMessagesService {
    constructor(@InjectRepository(ChannelMessage) private ChannelMessageRepository : Repository<ChannelMessage>) {}

    async getMessageBlock(channelId : number, timestamp : Date) {
        return await this.ChannelMessageRepository.find({
            relations: {
                channel: true
            },
            where: {
                channel: {
                    id: channelId
                },
                createdAt: LessThan(timestamp)
            },
            take: MessageBlockSize
        })
    }
}
