import { Repository } from 'typeorm';
import { AppCategory } from '../entities/app-category.entity';
import { AppDataSource } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class AppCategoryRepository {
  private repository: Repository<AppCategory>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppCategory);
  }

  async findAll(): Promise<AppCategory[]> {
    return this.repository.find({
      relations: ['subCategories'],
    });
  }

  async findById(id: string): Promise<AppCategory | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['subCategories'],
    });
  }

  async create(categoryData: Partial<AppCategory>): Promise<AppCategory> {
    const category = this.repository.create({
      ...categoryData,
      id: uuidv4(), // Gera o ID aqui
    });
    return this.repository.save(category);
  }


  async update(id: string, categoryData: Partial<AppCategory>): Promise<AppCategory | null> {
    await this.repository.update(id, categoryData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
} 