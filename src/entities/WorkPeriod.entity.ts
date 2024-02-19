import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User.entity';
import { Team } from './Team.entity';
import { BaseEntity } from './BaseEntity.entity';

@Entity('work_periods')
export class WorkPeriod extends BaseEntity {
  @Column('timestamptz')
  from: Date;

  @Column('timestamptz')
  to: Date;

  @Column('text')
  weekDays: string;

  @OneToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  userId: number;

  @OneToOne(() => Team, team => team.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teamId' })
  teamId: number;
}
