import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { App } from './app.entity';

@Entity('app_tags')
export class AppTag {
    @PrimaryColumn({ type: 'uuid' })
    id!: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'app_uuid', nullable: false })
  appUuid: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => App, (app) => app.appTags)
  @JoinColumn({ name: 'app_uuid' })
  app: App;
} 