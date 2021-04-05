import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from './category.entity';
import { Ngo } from './ngo.entity';

@Table
export class NgoCategory extends Model<NgoCategory> {

  @ForeignKey(() => Ngo)
  @Column
  ngoId: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Ngo)
  ngo: Ngo;

  @BelongsTo(() => Category)
  category: Category;
}