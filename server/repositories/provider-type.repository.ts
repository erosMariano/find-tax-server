import { Repository } from 'typeorm';
import { ProviderType } from '../entities/provider-type.entity';
import { AppDataSource } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class ProviderTypeRepository {
  private repository: Repository<ProviderType>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProviderType);
  }

  async findAll(): Promise<ProviderType[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<ProviderType | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(providerTypeData: Partial<ProviderType>): Promise<ProviderType> {
    const providerType = this.repository.create({
      ...providerTypeData,
      id: uuidv4(), // Gera o ID aqui
    });
    return this.repository.save(providerType);
  }

  async update(id: string, providerTypeData: Partial<ProviderType>): Promise<ProviderType | null> {
    await this.repository.update(id, providerTypeData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
} 