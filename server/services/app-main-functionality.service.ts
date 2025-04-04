import { AppMainFunctionality } from '../../server/entities/app-main-functionality.entity';
import { AppMainFunctionalityRepository } from '../../server/repositories/app-main-functionality.repository';

export class AppMainFunctionalityService {
  private repository: AppMainFunctionalityRepository;

  constructor() {
    this.repository = new AppMainFunctionalityRepository();
  }

  async getAllMainFunctionalities(): Promise<AppMainFunctionality[]> {
    return this.repository.findAll();
  }

  async getMainFunctionalityById(id: string): Promise<AppMainFunctionality | null> {
    return this.repository.findById(id);
  }

  async getMainFunctionalitiesByAppId(appId: string): Promise<AppMainFunctionality[]> {
    return this.repository.findByAppId(appId);
  }

  async createMainFunctionality(functionalityData: Partial<AppMainFunctionality>): Promise<AppMainFunctionality> {
    return this.repository.create(functionalityData);
  }

  async updateMainFunctionality(id: string, functionalityData: Partial<AppMainFunctionality>): Promise<AppMainFunctionality | null> {
    const existingFunctionality = await this.repository.findById(id);
    if (!existingFunctionality) {
      throw new Error('Main functionality not found');
    }
    return this.repository.update(id, functionalityData);
  }

  async deleteMainFunctionality(id: string): Promise<boolean> {
    const existingFunctionality = await this.repository.findById(id);
    if (!existingFunctionality) {
      throw new Error('Main functionality not found');
    }
    return this.repository.delete(id);
  }
} 