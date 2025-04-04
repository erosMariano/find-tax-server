import { Repository } from 'typeorm';
import { LeiMedia } from '../entities/lei-media.entity';
import { AppDataSource } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class LeiMediaRepository {
  private repository: Repository<LeiMedia>;

  constructor() {
    this.repository = AppDataSource.getRepository(LeiMedia);
  }

  async findAll(): Promise<LeiMedia[]> {
    return this.repository.find({
      relations: ['lei']
    });
  }

  async findById(id: string): Promise<LeiMedia | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['lei']
    });
  }

  async findByLeiId(leiId: string): Promise<LeiMedia[]> {
    return this.repository.find({
      where: { leiUuid: leiId },
      relations: ['lei']
    });
  }

  async create(mediaData: Partial<LeiMedia>): Promise<LeiMedia> {
    const media = this.repository.create({
      ...mediaData,
      id: uuidv4(), // Gera o ID aqui
    });
    return this.repository.save(media);
  }

  async update(id: string, mediaData: Partial<LeiMedia>): Promise<LeiMedia | null> {
    await this.repository.update(id, mediaData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
} 