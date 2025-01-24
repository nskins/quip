import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from 'db/data-source';
import { ChannelsModule } from './channels/channels.module';
import { ChannelMessagesModule } from './channel-messages/channel-messages.module';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    ChannelsModule,
    ChannelMessagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
