import { Repository } from 'typeorm';
import { AppSubCategory } from '../entities/app-sub-category.entity';
import { AppDataSource } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class AppSubCategoryRepository {
  private repository: Repository<AppSubCategory>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppSubCategory);
  }

  async findAll(): Promise<AppSubCategory[]> {
    return this.repository.find({
      relations: ['category'],
    });
  }

  async findById(id: string): Promise<AppSubCategory | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async findByCategoryId(categoryId: string): Promise<AppSubCategory[]> {
    return this.repository.find({
      where: { categoryId },
      relations: ['category'],
    });
  }

  async create(subCategoryData: Partial<AppSubCategory>): Promise<AppSubCategory> {
    const subCategory = this.repository.create({
      ...subCategoryData,
      id: uuidv4(), // Gera o ID aqui
    });
    return this.repository.save(subCategory);
  }

  async update(id: string, subCategoryData: Partial<AppSubCategory>): Promise<AppSubCategory | null> {
    await this.repository.update(id, subCategoryData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
} 