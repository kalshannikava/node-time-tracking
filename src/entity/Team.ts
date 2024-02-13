import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('teams')
export class Team extends BaseEntity {
  @Column('text')
  name: string;

  @Column('text')
  logo: string;
}
