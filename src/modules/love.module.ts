import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeController } from 'src/controllers/love.controller';
import { Love } from 'src/entities/love.entity';
import { LoveService } from 'src/services/love.service';

@Module({
  imports: [TypeOrmModule.forFeature([Love])],
  controllers: [LikeController],
  providers: [
    LoveService,
  ],
})
export class LikesModule {}