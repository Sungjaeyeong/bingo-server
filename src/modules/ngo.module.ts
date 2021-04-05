import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { DatabaseModule } from 'src/database/database.module';
import { ngosProviders } from 'src/providers/ngos.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    ...ngosProviders,
  ],
})
export class NgosModule {}