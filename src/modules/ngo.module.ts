import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { Ngo } from 'src/entities/ngo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ngo])],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class NgosModule {}