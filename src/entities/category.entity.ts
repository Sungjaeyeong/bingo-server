import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { NgoCategory } from './ngocategory.entity';

@Table
export class Category extends Model<Category> {
  
  @Column
  name: string;

  @HasMany(() => NgoCategory)
  ngocategory: NgoCategory[];
}
