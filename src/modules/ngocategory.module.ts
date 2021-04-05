import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { DatabaseModule } from 'src/database/database.module';
import { ngocategorysProviders } from 'src/providers/ngocategorys.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    ...ngocategorysProviders,
  ],
})
export class NgoCategorysModule {}