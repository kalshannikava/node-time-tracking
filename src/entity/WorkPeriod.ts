import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Team } from './Team';
import { BaseEntity } from './BaseEntity';

@Entity('work_periods')
export class WorkPeriod extends BaseEntity {
  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  weekDays: string;

  @OneToOne(() => User)
  @JoinColumn()
  userId: number;

  @OneToOne(() => Team)
  @JoinColumn()
  teamId: number;
}
