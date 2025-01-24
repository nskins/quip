import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from 'db/data-source';
import { ChannelsModule } from './channels/channels.module';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    ChannelsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
