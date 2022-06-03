import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users_stats')
export class UserStats extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: true })
  kills: number = 0;

  @Column({ nullable: true })
  deaths: number = 0;
}
