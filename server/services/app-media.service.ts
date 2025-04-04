import { AppMedia } from '../../server/entities/app-media.entity';
import { AppMediaRepository } from '../../server/repositories/app-media.repository';

export class AppMediaService {
  private repository: AppMediaRepository;

  constructor() {
    this.repository = new AppMediaRepository();
  }

  async getAllMedias(): Promise<AppMedia[]> {
    return this.repository.findAll();
  }

  async getMediaById(id: string): Promise<AppMedia | null> {
    return this.repository.findById(id);
  }

  async getMediasByAppId(appId: string): Promise<AppMedia[]> {
    return this.repository.findByAppId(appId);
  }

  async createMedia(mediaData: Partial<AppMedia>): Promise<AppMedia> {
    return this.repository.create(mediaData);
  }

  async updateMedia(id: string, mediaData: Partial<AppMedia>): Promise<AppMedia | null> {
    const existingMedia = await this.repository.findById(id);
    if (!existingMedia) {
      throw new Error('Media not found');
    }
    return this.repository.update(id, mediaData);
  }

  async deleteMedia(id: string): Promise<boolean> {
    const existingMedia = await this.repository.findById(id);
    if (!existingMedia) {
      throw new Error('Media not found');
    }
    return this.repository.delete(id);
  }
} 