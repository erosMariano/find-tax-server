import { Repository } from 'typeorm';
import { App } from '../entities/app.entity';
import { AppDataSource } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class AppRepository {
  private repository: Repository<App>;

  constructor() {
    this.repository = AppDataSource.getRepository(App);
  }

  async findAll(): Promise<App[]> {
    return this.repository.find({
      relations: [
        'provider',
        'ratings',
        'medias',
        'appMainFunctionalities',
        'appTags',
        'appFunctionalities'
      ],
    });
  }

  async findById(id: string): Promise<App | null> {
    return this.repository.findOne({
      where: { id },
      relations: [
        'provider',
        'ratings',
        'medias',
        'appMainFunctionalities',
        'appTags',
        'appFunctionalities'
      ],
    });
  }

  async findByProviderId(providerId: string): Promise<App[]> {
    return this.repository.find({
      where: { providerUuid: providerId },
      relations: [
        'provider',
        'ratings',
        'medias',
        'appMainFunctionalities',
        'appTags',
        'appFunctionalities'
      ],
    });
  }

  async create(appData: Partial<App>): Promise<App> {
    const app = this.repository.create({
      ...appData,
      id: uuidv4(), // Gera o ID aqui
    });
    return this.repository.save(app);
  }

  async update(id: string, appData: Partial<App>): Promise<App | null> {
    await this.repository.update(id, appData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
} 