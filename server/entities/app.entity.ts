import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { AppProvider } from './app-provider.entity';
import { AppRating } from './app-rating.entity';
import { AppMedia } from './app-media.entity';
import { AppMainFunctionality } from './app-main-functionality.entity';
import { AppTag } from './app-tag.entity';
import { AppFunctionality } from './app-functionality.entity';

@Entity('apps')
export class App {
    @PrimaryColumn({ type: 'uuid' })
    id!: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'app_photo' })
  photo: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'numeric', precision: 3, scale: 2, nullable: true })
  rating: number;

  @Column({ type: 'text', nullable: true })
  functionalities: string;

  @Column({ type: 'text', nullable: true, name: 'main_functionalities' })
  mainFunctionalities: string;

  @Column({ type: 'text', nullable: true })
  integrations: string;

  @Column({ type: 'text', nullable: true })
  tags: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ nullable: true, name: 'app_provider_uuid' })
  providerUuid: string;

  @ManyToOne(() => AppProvider, (provider) => provider.apps)
  @JoinColumn({ name: 'app_provider_uuid' })
  provider: AppProvider;

  @OneToMany(() => AppRating, (rating) => rating.app)
  ratings: AppRating[];

  @OneToMany(() => AppMedia, (media) => media.app)
  medias: AppMedia[];

  @OneToMany(() => AppMainFunctionality, (mainFunctionality) => mainFunctionality.app)
  appMainFunctionalities: AppMainFunctionality[];

  @OneToMany(() => AppTag, (tag) => tag.app)
  appTags: AppTag[];

  @OneToMany(() => AppFunctionality, (functionality) => functionality.app)
  appFunctionalities: AppFunctionality[];
} 