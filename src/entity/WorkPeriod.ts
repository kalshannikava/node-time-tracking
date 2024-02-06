import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Team } from './Team';

@Entity('work_periods')
export class WorkPeriod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  weekdays: string;

  @OneToOne(() => User)
  @JoinColumn()
  userId: number;

  @OneToOne(() => Team)
  @JoinColumn()
  teamId: number;
}
