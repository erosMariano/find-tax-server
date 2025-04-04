import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { App } from './app.entity';

@Entity('app_main_functionalities')
export class AppMainFunctionality {
    @PrimaryColumn({ type: 'uuid' })
    id!: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ name: 'app_uuid', nullable: false })
  appUuid: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => App, (app) => app.appMainFunctionalities)
  @JoinColumn({ name: 'app_uuid' })
  app: App;
} 