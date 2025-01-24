import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Channel } from './channel.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class ChannelMessage {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(() => Channel, (channel) => channel.messages)
    channel : Channel

    @ManyToOne(() => User, (user) => user.messages)
    user : User

    @Column()
    text : string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}