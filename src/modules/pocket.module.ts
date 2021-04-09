import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PocketController } from 'src/controllers/pocket.controller';
import { Pocket } from 'src/entities/pocket.entity';
import { PocketService } from 'src/services/pocket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pocket])],
  controllers: [PocketController],
  providers: [
    PocketService,
  ],
})
export class PocketsModule {}