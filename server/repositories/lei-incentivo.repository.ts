import { Repository } from 'typeorm';
import { LeiIncentivo } from '../entities/lei-incentivo.entity';
import { AppDataSource } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class LeiIncentivoRepository {
  private repository: Repository<LeiIncentivo>;

  constructor() {
    this.repository = AppDataSource.getRepository(LeiIncentivo);
  }

  async findAll(): Promise<LeiIncentivo[]> {
    return this.repository.find({
      relations: ['provider', 'medias']
    });
  }

  async findById(id: string): Promise<LeiIncentivo | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['provider', 'medias']
    });
  }

  async findByProviderId(providerId: string): Promise<LeiIncentivo[]> {
    return this.repository.find({
      where: { appProviderUuid: providerId },
      relations: ['provider', 'medias']
    });
  }

  async create(leiData: Partial<LeiIncentivo>): Promise<LeiIncentivo> {
    const lei = this.repository.create({
      ...leiData,
      id: uuidv4(), // Gera o ID aqui
    });
    return this.repository.save(lei);
  }

  async update(id: string, leiData: Partial<LeiIncentivo>): Promise<LeiIncentivo | null> {
    await this.repository.update(id, leiData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
} 