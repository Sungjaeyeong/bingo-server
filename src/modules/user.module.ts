import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from 'src/providers/users.providers';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    ...usersProviders,
  ],
})
export class UsersModule {}