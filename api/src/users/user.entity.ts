import { ChannelMessage } from 'src/channels/channel-message.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number

    @Column({ unique: true })
    email: string

    @Column()
    hashedPassword: string

    @OneToMany(() => ChannelMessage, (message) => message.channel)
    messages : ChannelMessage[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}