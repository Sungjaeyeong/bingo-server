import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategorysModule } from './modules/category.module';
import { NgosModule } from './modules/ngo.module';
import { NgoCategorysModule } from './modules/ngocategory.module';
import { UsersModule } from './modules/user.module';
import { DonatesModule } from './modules/donate.module';
import { LikesModule } from './modules/like.module';
import { PocketsModule } from './modules/pocket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like } from './entities/like.entity';
import { Pocket } from './entities/pocket.entity';
import { NgoCategory } from './entities/ngocategory.entity';
import { Ngo } from './entities/ngo.entity';
import { Donate } from './entities/donate.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [UsersModule, DonatesModule, LikesModule, PocketsModule, NgosModule, CategorysModule, NgoCategorysModule,   
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'nest',
      entities: [User, Category, Donate, Like, Ngo, NgoCategory, Pocket],
      synchronize: true,
    }),
    ],
    controllers: [AppController],
    providers: [AppService],
  })
export class AppModule {}
