import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonateController } from 'src/controllers/donate.controller';
import { Donate } from 'src/entities/donate.entity';
import { DonateService } from 'src/services/donate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Donate])],
  controllers: [DonateController],
  providers: [
    DonateService,
  ],
})
export class DonatesModule {}