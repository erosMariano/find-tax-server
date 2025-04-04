import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('app_categories')
export class AppCategory {
    @PrimaryColumn({ type: 'uuid' })
    id!: string;

  @Column({ type: 'text', nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @OneToMany('AppSubCategory', 'category')
  subCategories!: any[];
} 