import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.entity';
import { Ngo } from './ngo.entity';

@Table
export class Donate extends Model<Donate> {
  
  @Column
  money: number;

  @Column
  type: string;

  @Column
  ing: boolean;

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
