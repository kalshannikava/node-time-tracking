import { ISession } from 'connect-typeorm';
import { Column, DeleteDateColumn, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('session')
export class Session implements ISession {
  @Index()
  @Column('bigint')
  expiredAt: number;

  @PrimaryColumn('text')
  id: string;

  @Column('json')
  json: string;

  @DeleteDateColumn()
  public destroyedAt?: Date;
}
