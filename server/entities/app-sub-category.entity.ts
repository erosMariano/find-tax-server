import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity('app_sub_categories')
export class AppSubCategory {
    @PrimaryColumn({ type: 'uuid' })
    id!: string;
    
  @Column({ type: 'text', nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ name: 'app_category_uuid' })
  categoryId!: string;

  @ManyToOne('AppCategory', 'subCategories')
  @JoinColumn({ name: 'app_category_uuid', referencedColumnName: 'id' })
  category!: any;
} 