import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { App } from './app.entity';

@Entity('app_functionalities')
export class AppFunctionality {
    @PrimaryColumn({ type: 'uuid' })
    id!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ name: 'app_uuid', nullable: false })
  appUuid: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 100, nullable: false })
  type: string;

  @ManyToOne(() => App, (app) => app.appFunctionalities)
  @JoinColumn({ name: 'app_uuid' })
  app: App;
} 