import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  
  @Column
  username: string;

  @Column
  profileImage: string;

  @Column
  level: string;
}
