import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ChannelMessage } from './channel-message.entity';

@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id : number

    @Column({ unique: true })
    name: string

    @OneToMany(() => ChannelMessage, (message) => message.channel)
    messages : ChannelMessage[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}