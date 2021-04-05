import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonatesModule } from './modules/donate.module';
import { LikesModule } from './modules/like.module';
import { PocketsModule } from './modules/pocket.module';
import { UsersModule } from './modules/user.module';

@Module({
  imports: [UsersModule, DonatesModule, LikesModule, PocketsModule,
    ConfigModule.forRoot()
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
