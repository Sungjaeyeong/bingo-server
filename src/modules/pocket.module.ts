import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PocketController } from 'src/controllers/pocket.controller';
import { Pocket } from 'src/entities/pocket.entity';
import { User } from 'src/entities/user.entity';
import { PocketService } from 'src/services/pocket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pocket]), TypeOrmModule.forFeature([User])],
  controllers: [PocketController],
  providers: [
    PocketService,
  ],
})
export class PocketsModule {}