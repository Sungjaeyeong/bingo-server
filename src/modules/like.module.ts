import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeController } from 'src/controllers/like.controller';
import { Like } from 'src/entities/like.entity';
import { LikeService } from 'src/services/like.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  controllers: [LikeController],
  providers: [
    LikeService,
  ],
})
export class LikesModule {}