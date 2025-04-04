import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { LeiIncentivo } from './lei-incentivo.entity';

@Entity('leis_medias')
export class LeiMedia {
    @PrimaryColumn({ type: 'uuid' })
    id!: string;

  @Column({ type: 'text', nullable: true })
  name!: string;

  @Column({ type: 'text', nullable: false, name: 'asset_id' })
  assetId!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  provider!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @Column({ name: 'lei_uuid' })
  leiUuid!: string;

  @ManyToOne(() => LeiIncentivo, (lei) => lei.medias)
  @JoinColumn({ name: 'lei_uuid' })
  lei!: LeiIncentivo;
} 