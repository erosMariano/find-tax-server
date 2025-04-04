import { Repository } from 'typeorm';
import { AppMainFunctionality } from '../entities/app-main-functionality.entity';
import { AppDataSource } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class AppMainFunctionalityRepository {
  private repository: Repository<AppMainFunctionality>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppMainFunctionality);
  }

  async findAll(): Promise<AppMainFunctionality[]> {
    return this.repository.find({
      relations: ['app'],
    });
  }

  async findById(id: string): Promise<AppMainFunctionality | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['app'],
    });
  }

  async findByAppId(appId: string): Promise<AppMainFunctionality[]> {
    return this.repository.find({
      where: { appUuid: appId },
      relations: ['app'],
    });
  }

  async create(functionalityData: Partial<AppMainFunctionality>): Promise<AppMainFunctionality> {
    const functionality = this.repository.create({
      ...functionalityData,
      id: uuidv4(), // Gera o ID aqui
    });
    return this.repository.save(functionality);
  }

  async update(id: string, functionalityData: Partial<AppMainFunctionality>): Promise<AppMainFunctionality | null> {
    await this.repository.update(id, functionalityData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
} 