import { Injectable } from '@nestjs/common';
import { ChannelMessage } from './channel-message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

const MessageBlockSize : number = 25

@Injectable()
export class ChannelMessagesService {
    constructor(@InjectRepository(ChannelMessage) private ChannelMessageRepository : Repository<ChannelMessage>) {}

    async getBlock(channelId : number, timestamp : Date) {
        var messages = await this.ChannelMessageRepository.find({
            relations: {
                channel: true,
                user: true
            },
            where: {
                channel: {
                    id: channelId
                },
                createdAt: LessThan(timestamp)
            },
            order: {
                id: "DESC"
            },
            take: MessageBlockSize
        });

        return messages.reverse();
    }

    async getById(id : number) : Promise<ChannelMessage | null> {
        const results = await this.ChannelMessageRepository.find({
            relations: {
                channel: true,
                user: true
            },
            where: {
                id: id
            }
        });

        return results.length > 0 ? results[0] : null;
    }

    async create(payload: {
        channelId: number, 
        userId: number,
        text: string,
    }) : Promise<ChannelMessage> {
        return await this.ChannelMessageRepository.save({
            channel: {
                id: payload.channelId
            },
            user: {
                id: payload.userId
            },
            text: payload.text
        });
    }
}
