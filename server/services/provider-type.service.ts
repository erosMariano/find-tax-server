import { ProviderType } from '../../server/entities/provider-type.entity';
import { ProviderTypeRepository } from '../../server/repositories/provider-type.repository';

export class ProviderTypeService {
  private repository: ProviderTypeRepository;

  constructor() {
    this.repository = new ProviderTypeRepository();
  }

  async getAllProviderTypes(): Promise<ProviderType[]> {
    return this.repository.findAll();
  }

  async getProviderTypeById(id: string): Promise<ProviderType | null> {
    return this.repository.findById(id);
  }

  async createProviderType(providerTypeData: Partial<ProviderType>): Promise<ProviderType> {
    return this.repository.create(providerTypeData);
  }

  async updateProviderType(id: string, providerTypeData: Partial<ProviderType>): Promise<ProviderType | null> {
    const existingProviderType = await this.repository.findById(id);
    if (!existingProviderType) {
      throw new Error('Provider type not found');
    }
    return this.repository.update(id, providerTypeData);
  }

  async deleteProviderType(id: string): Promise<boolean> {
    const existingProviderType = await this.repository.findById(id);
    if (!existingProviderType) {
      throw new Error('Provider type not found');
    }
    return this.repository.delete(id);
  }
} 