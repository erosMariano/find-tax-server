import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { AppProvider } from './app-provider.entity';
import { LeiMedia } from './lei-media.entity';

@Entity('leis_incentivo')
export class LeiIncentivo {
    @PrimaryColumn({ type: 'uuid' })
    id!: string;

  @Column({ type: 'text', nullable: true })
  title!: string;

  @Column({ type: 'text', nullable: true })
  subtitle!: string;

  @Column({ type: 'text', nullable: true })
  tag!: string;

  @Column({ type: 'text', nullable: true })
  proponente!: string;

  @Column({ type: 'text', nullable: true })
  objetivo!: string;

  @Column({ type: 'text', nullable: true })
  contrapartida!: string;

  @Column({ type: 'text', nullable: true, name: 'locais_execucao' })
  locaisExecucao!: string;

  @Column({ type: 'text', nullable: true, name: 'lei_photo' })
  photo!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @Column({ type: 'text', nullable: true, name: 'publico_alvo' })
  publicoAlvo!: string;

  @Column({ type: 'numeric', nullable: true, name: 'total_impactados' })
  totalImpactados!: number;

  @Column({ type: 'numeric', nullable: true })
  investimento!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imposto!: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'area_direcionamento' })
  areaDirecionamento!: string;

  @Column({ nullable: true, name: 'app_provider_uuid' })
  appProviderUuid!: string;

  @ManyToOne(() => AppProvider, { nullable: true })
  @JoinColumn({ name: 'app_provider_uuid' })
  provider!: AppProvider;

  @OneToMany(() => LeiMedia, (media) => media.lei)
  medias!: LeiMedia[];
} 