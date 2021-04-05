import { Module } from '@nestjs/common';
import { PocketController } from 'src/controllers/pocket.controller';
import { DatabaseModule } from 'src/database/database.module';
import { pocketsProviders } from 'src/providers/pockets.providers';
import { PocketService } from 'src/services/pocket.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PocketController],
  providers: [
    PocketService,
    ...pocketsProviders,
  ],
})
export class PocketsModule {}