import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.entity';
import { Ngo } from './ngo.entity';

@Table
export class Pocket extends Model<Pocket> {
  
  @Column
  type: string;

  @Column
  money: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Ngo)
  @Column
  ngoId: number;

  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => Ngo)
  ngo: Ngo

}
