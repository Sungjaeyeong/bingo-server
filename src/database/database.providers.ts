import { Sequelize } from 'sequelize-typescript';
import { Category } from 'src/entities/category.entity';
import { Donate } from 'src/entities/donate.entity';
import { Like } from 'src/entities/like.entity';
import { Ngo } from 'src/entities/ngo.entity';
import { NgoCategory } from 'src/entities/ngocategory.entity';
import { Pocket } from 'src/entities/pocket.entity';
import { User } from 'src/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: 'nest',
      });
      sequelize.addModels([User, Donate, Like, Pocket, Ngo, Category, NgoCategory]);
      await sequelize.sync();
      return sequelize;
    },
  },
];