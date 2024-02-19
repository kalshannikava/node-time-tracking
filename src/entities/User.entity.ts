import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('timestamptz')
  timezone: Date;
}
