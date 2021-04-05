import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategorysModule } from './modules/category.module';
import { NgosModule } from './modules/ngo.module';
import { NgoCategorysModule } from './modules/ngocategory.module';
import { UsersModule } from './modules/user.module';

@Module({
  imports: [UsersModule, NgosModule, CategorysModule, NgoCategorysModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
