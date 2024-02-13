import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('users')
export class User extends BaseEntity {
  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  timezone: string;
}
