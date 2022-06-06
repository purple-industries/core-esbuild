import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserStats } from '@southside-server/modules/database/entities/UserStats';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  discordId: string;

  @Column({ nullable: true })
  discordAvatarId: string;

  @Column({ nullable: true })
  lastIp: string;

  @Column({ nullable: true })
  hwidHash: string;

  @Column({ nullable: true })
  hwidHashEx: string;

  @Column({ nullable: true })
  isBanned: boolean = false;

  @Column({ nullable: true })
  isAdmin: boolean = false;


  @OneToOne(() => UserStats, { eager: true, cascade: true })
  @JoinColumn()
  stats: UserStats;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  public updated_at: Date;

}
