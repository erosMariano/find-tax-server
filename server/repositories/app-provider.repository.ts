import { Repository } from 'typeorm';
import { AppProvider } from '../entities/app-provider.entity';
import { AppDataSource } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class AppProviderRepository {
  private repository: Repository<AppProvider>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppProvider);
  }

  async findAll(): Promise<AppProvider[]> {
    return this.repository.find({
      relations: ['apps'],
    });
  }

  async findById(id: string): Promise<AppProvider | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['apps'],
    });
  }

  async create(providerData: Partial<AppProvider>): Promise<AppProvider> {
    const provider = this.repository.create({
      ...providerData,
      id: uuidv4(), // Gera o ID aqui
    });
    return this.repository.save(provider);
  }

  async update(id: string, providerData: Partial<AppProvider>): Promise<AppProvider | null> {
    await this.repository.update(id, providerData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
} 