import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { App } from './app.entity';

@Entity('app_rating')
export class AppRating {
    @PrimaryColumn({ type: 'uuid' })
    id!: string;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'int', nullable: false })
  stars: number;

  @Column({ name: 'app_uuid', nullable: false })
  appUuid: string;

  @Column({ name: 'account_uuid', nullable: false })
  accountUuid: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => App, (app) => app.ratings)
  @JoinColumn({ name: 'app_uuid' })
  app: App;
} 