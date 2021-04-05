import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Ngo extends Model<Ngo> {
  
  @Column
  name: string;

  @Column
  link: string;

  @Column
  logo: string;

  @Column
  video: string;

  @Column
  coverImage: string;

  @Column
  description: string;

  @Column
  since: string;
}
