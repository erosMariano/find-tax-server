import { AppFunctionality } from '../../server/entities/app-functionality.entity';
import { AppFunctionalityRepository } from '../../server/repositories/app-functionality.repository';

export class AppFunctionalityService {
  private repository: AppFunctionalityRepository;

  constructor() {
    this.repository = new AppFunctionalityRepository();
  }

  async getAllFunctionalities(): Promise<AppFunctionality[]> {
    return this.repository.findAll();
  }

  async getFunctionalityById(id: string): Promise<AppFunctionality | null> {
    return this.repository.findById(id);
  }

  async getFunctionalitiesByAppId(appId: string): Promise<AppFunctionality[]> {
    return this.repository.findByAppId(appId);
  }

  async getFunctionalitiesByType(type: string): Promise<AppFunctionality[]> {
    return this.repository.findByType(type);
  }

  async createFunctionality(functionalityData: Partial<AppFunctionality>): Promise<AppFunctionality> {
    return this.repository.create(functionalityData);
  }

  async updateFunctionality(id: string, functionalityData: Partial<AppFunctionality>): Promise<AppFunctionality | null> {
    const existingFunctionality = await this.repository.findById(id);
    if (!existingFunctionality) {
      throw new Error('Functionality not found');
    }
    return this.repository.update(id, functionalityData);
  }

  async deleteFunctionality(id: string): Promise<boolean> {
    const existingFunctionality = await this.repository.findById(id);
    if (!existingFunctionality) {
      throw new Error('Functionality not found');
    }
    return this.repository.delete(id);
  }
} 