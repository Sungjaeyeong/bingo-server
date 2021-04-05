import { Module } from '@nestjs/common';
import { DonateController } from 'src/controllers/donate.controller';
import { DatabaseModule } from 'src/database/database.module';
import { donatesProviders } from 'src/providers/donates.providers';
import { DonateService } from 'src/services/donate.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DonateController],
  providers: [
    DonateService,
    ...donatesProviders,
  ],
})
export class DonatesModule {}