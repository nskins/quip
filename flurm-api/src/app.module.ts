import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "flurm-db",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true // TODO: switch to false for production
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
