import { AppSubCategory } from '../../server/entities/app-sub-category.entity';
import { AppSubCategoryRepository } from '../../server/repositories/app-sub-category.repository';
import { AppCategoryRepository } from '../../server/repositories/app-category.repository';

export class AppSubCategoryService {
  private repository: AppSubCategoryRepository;
  private categoryRepository: AppCategoryRepository;

  constructor() {
    this.repository = new AppSubCategoryRepository();
    this.categoryRepository = new AppCategoryRepository();
  }

  async getAllSubCategories(): Promise<AppSubCategory[]> {
    return this.repository.findAll();
  }

  async getSubCategoryById(id: string): Promise<AppSubCategory | null> {
    return this.repository.findById(id);
  }

  async getSubCategoriesByCategoryId(categoryId: string): Promise<AppSubCategory[]> {
    return this.repository.findByCategoryId(categoryId);
  }

  async createSubCategory(subCategoryData: Partial<AppSubCategory>): Promise<AppSubCategory> {
    // Verify if category exists
    if (subCategoryData.categoryId) {
      const category = await this.categoryRepository.findById(subCategoryData.categoryId);
      if (!category) {
        throw new Error('Parent category not found');
      }
    }
    return this.repository.create(subCategoryData);
  }

  async updateSubCategory(id: string, subCategoryData: Partial<AppSubCategory>): Promise<AppSubCategory | null> {
    const existingSubCategory = await this.repository.findById(id);
    if (!existingSubCategory) {
      throw new Error('Sub-category not found');
    }

    // Verify if new category exists if category is being changed
    if (subCategoryData.categoryId && subCategoryData.categoryId !== existingSubCategory.categoryId) {
      const category = await this.categoryRepository.findById(subCategoryData.categoryId);
      if (!category) {
        throw new Error('Parent category not found');
      }
    }

    return this.repository.update(id, subCategoryData);
  }

  async deleteSubCategory(id: string): Promise<boolean> {
    const existingSubCategory = await this.repository.findById(id);
    if (!existingSubCategory) {
      throw new Error('Sub-category not found');
    }
    return this.repository.delete(id);
  }
} 