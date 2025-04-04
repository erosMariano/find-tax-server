import { Repository } from 'typeorm';
import { AppFunctionality } from '../entities/app-functionality.entity';
import { AppDataSource } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class AppFunctionalityRepository {
  private repository: Repository<AppFunctionality>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppFunctionality);
  }

  async findAll(): Promise<AppFunctionality[]> {
    return this.repository.find({
      relations: ['app'],
    });
  }

  async findById(id: string): Promise<AppFunctionality | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['app'],
    });
  }

  async findByAppId(appId: string): Promise<AppFunctionality[]> {
    return this.repository.find({
      where: { appUuid: appId },
      relations: ['app'],
    });
  }

  async findByType(type: string): Promise<AppFunctionality[]> {
    return this.repository.find({
      where: { type },
      relations: ['app'],
    });
  }

  async create(functionalityData: Partial<AppFunctionality>): Promise<AppFunctionality> {
    const functionality = this.repository.create({
      ...functionalityData,
      id: uuidv4(), // Gera o ID aqui
    });
    return this.repository.save(functionality);
  }

  async update(id: string, functionalityData: Partial<AppFunctionality>): Promise<AppFunctionality | null> {
    await this.repository.update(id, functionalityData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
} 