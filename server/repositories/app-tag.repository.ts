import { Repository } from 'typeorm';
import { AppTag } from '../entities/app-tag.entity';
import { AppDataSource } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class AppTagRepository {
  private repository: Repository<AppTag>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppTag);
  }

  async findAll(): Promise<AppTag[]> {
    return this.repository.find({
      relations: ['app'],
    });
  }

  async findById(id: string): Promise<AppTag | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['app'],
    });
  }

  async findByAppId(appId: string): Promise<AppTag[]> {
    return this.repository.find({
      where: { appUuid: appId },
      relations: ['app'],
    });
  }

  async create(tagData: Partial<AppTag>): Promise<AppTag> {
    const tag = this.repository.create({
      ...tagData,
      id: uuidv4(), // Gera o ID aqui
    });
    return this.repository.save(tag);
  }

  async update(id: string, tagData: Partial<AppTag>): Promise<AppTag | null> {
    await this.repository.update(id, tagData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
} 