import { Module } from '@nestjs/common';
import { LikeController } from 'src/controllers/like.controller';
import { DatabaseModule } from 'src/database/database.module';
import { likesProviders } from 'src/providers/likes.providers';
import { LikeService } from 'src/services/like.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LikeController],
  providers: [
    LikeService,
    ...likesProviders,
  ],
})
export class LikesModule {}