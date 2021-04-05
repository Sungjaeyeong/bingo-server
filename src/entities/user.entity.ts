import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Donate } from './donate.entity';
import { Like } from './like.entity';
import { Pocket } from './pocket.entity';

@Table
export class User extends Model<User> {
  
  @Column
  username: string;

  @Column
  profileImage: string;

  @Column
  level: string;

  @HasMany(() => Donate)
  donates: Donate[]

  @HasMany(() => Like)
  like: Like[]

  @HasMany(() => Pocket)
  pocket: Pocket[]

}
