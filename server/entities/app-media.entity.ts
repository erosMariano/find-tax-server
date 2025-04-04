import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { App } from './app.entity';

@Entity('apps_medias')
export class AppMedia {
    @PrimaryColumn({ type: 'uuid' })
    id!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'asset_id' })
  assetId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  provider: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'app_uuid', nullable: false })
  appUuid: string;

  @ManyToOne(() => App, (app) => app.medias)
  @JoinColumn({ name: 'app_uuid' })
  app: App;
} 