import { Repository } from 'typeorm';
import { AppMedia } from '../entities/app-media.entity';
import { AppDataSource } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class AppMediaRepository {
  private repository: Repository<AppMedia>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppMedia);
  }

  async findAll(): Promise<AppMedia[]> {
    return this.repository.find({
      relations: ['app'],
    });
  }

  async findById(id: string): Promise<AppMedia | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['app'],
    });
  }

  async findByAppId(appId: string): Promise<AppMedia[]> {
    return this.repository.find({
      where: { appUuid: appId },
      relations: ['app'],
    });
  }

  async create(mediaData: Partial<AppMedia>): Promise<AppMedia> {
    const media = this.repository.create({
      ...mediaData,
      id: uuidv4(), // Gera o ID aqui
    });
    return this.repository.save(media);
  }

  async update(id: string, mediaData: Partial<AppMedia>): Promise<AppMedia | null> {
    await this.repository.update(id, mediaData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
} 