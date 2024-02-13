import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Team } from './Team';
import { BaseEntity } from './BaseEntity';

@Entity('work_periods')
export class WorkPeriod extends BaseEntity {
  @Column('text')
  from: string;

  @Column('text')
  to: string;

  @Column('text')
  weekDays: string;

  @OneToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  userId: number;

  @OneToOne(() => Team, team => team.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teamId' })
  teamId: number;
}
