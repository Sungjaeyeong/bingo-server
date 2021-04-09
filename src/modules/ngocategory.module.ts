import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { NgoCategory } from 'src/entities/ngocategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NgoCategory])],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class NgoCategorysModule {}