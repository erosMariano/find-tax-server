import { Repository } from 'typeorm';
import { AppRating } from '../entities/app-rating.entity';
import { AppDataSource } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class AppRatingRepository {
  private repository: Repository<AppRating>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppRating);
  }

  async findAll(): Promise<AppRating[]> {
    return this.repository.find({
      relations: ['app'],
    });
  }

  async findById(id: string): Promise<AppRating | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['app'],
    });
  }

  async findByAppId(appId: string): Promise<AppRating[]> {
    return this.repository.find({
      where: { appUuid: appId },
      relations: ['app'],
    });
  }

  async findByAccountId(accountId: string): Promise<AppRating[]> {
    return this.repository.find({
      where: { accountUuid: accountId },
      relations: ['app'],
    });
  }

  async create(ratingData: Partial<AppRating>): Promise<AppRating> {
    const rating = this.repository.create({
      ...ratingData,
      id: uuidv4(), // Gera o ID aqui
    });
    return this.repository.save(rating);
  }

  async update(id: string, ratingData: Partial<AppRating>): Promise<AppRating | null> {
    await this.repository.update(id, ratingData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
} 