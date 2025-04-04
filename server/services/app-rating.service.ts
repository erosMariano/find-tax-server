import { AppRating } from '../../server/entities/app-rating.entity';
import { AppRatingRepository } from '../../server/repositories/app-rating.repository';

export class AppRatingService {
  private repository: AppRatingRepository;

  constructor() {
    this.repository = new AppRatingRepository();
  }

  async getAllRatings(): Promise<AppRating[]> {
    return this.repository.findAll();
  }

  async getRatingById(id: string): Promise<AppRating | null> {
    return this.repository.findById(id);
  }

  async getRatingsByAppId(appId: string): Promise<AppRating[]> {
    return this.repository.findByAppId(appId);
  }

  async getRatingsByAccountId(accountId: string): Promise<AppRating[]> {
    return this.repository.findByAccountId(accountId);
  }

  async createRating(ratingData: Partial<AppRating>): Promise<AppRating> {
    return this.repository.create(ratingData);
  }

  async updateRating(id: string, ratingData: Partial<AppRating>): Promise<AppRating | null> {
    const existingRating = await this.repository.findById(id);
    if (!existingRating) {
      throw new Error('Rating not found');
    }
    return this.repository.update(id, ratingData);
  }

  async deleteRating(id: string): Promise<boolean> {
    const existingRating = await this.repository.findById(id);
    if (!existingRating) {
      throw new Error('Rating not found');
    }
    return this.repository.delete(id);
  }
} 