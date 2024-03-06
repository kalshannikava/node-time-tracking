import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column('text', { nullable: true })
  googleId: string;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  hash: string;

  @Column('text', { nullable: true })
  salt: string;

  @Column('text', { unique: true, nullable: true })
  email: string;

  @Column('timestamptz', { nullable: true })
  timezone: Date;
}
