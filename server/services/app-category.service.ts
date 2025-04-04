import { AppCategory } from '../../server/entities/app-category.entity';
import { AppCategoryRepository } from '../../server/repositories/app-category.repository';

export class AppCategoryService {
  private repository: AppCategoryRepository;

  constructor() {
    this.repository = new AppCategoryRepository();
  }

  async getAllCategories(): Promise<AppCategory[]> {
    return this.repository.findAll();
  }

  async getCategoryById(id: string): Promise<AppCategory | null> {
    return this.repository.findById(id);
  }

  async createCategory(categoryData: Partial<AppCategory>): Promise<AppCategory> {
    return this.repository.create(categoryData);
  }

  async updateCategory(id: string, categoryData: Partial<AppCategory>): Promise<AppCategory | null> {
    const existingCategory = await this.repository.findById(id);
    if (!existingCategory) {
      throw new Error('Category not found');
    }
    return this.repository.update(id, categoryData);
  }

  async deleteCategory(id: string): Promise<boolean> {
    const existingCategory = await this.repository.findById(id);
    if (!existingCategory) {
      throw new Error('Category not found');
    }
    return this.repository.delete(id);
  }
} 