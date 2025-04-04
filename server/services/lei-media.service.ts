import { LeiMedia } from '../../server/entities/lei-media.entity';
import { LeiMediaRepository } from '../../server/repositories/lei-media.repository';

export class LeiMediaService {
  private repository: LeiMediaRepository;

  constructor() {
    this.repository = new LeiMediaRepository();
  }

  async getAllLeiMedias(): Promise<LeiMedia[]> {
    return this.repository.findAll();
  }

  async getLeiMediaById(id: string): Promise<LeiMedia | null> {
    return this.repository.findById(id);
  }

  async getLeiMediasByLeiId(leiId: string): Promise<LeiMedia[]> {
    return this.repository.findByLeiId(leiId);
  }

  async createLeiMedia(mediaData: Partial<LeiMedia>): Promise<LeiMedia> {
    return this.repository.create(mediaData);
  }

  async updateLeiMedia(id: string, mediaData: Partial<LeiMedia>): Promise<LeiMedia | null> {
    const existingMedia = await this.repository.findById(id);
    if (!existingMedia) {
      throw new Error('Lei media not found');
    }
    return this.repository.update(id, mediaData);
  }

  async deleteLeiMedia(id: string): Promise<boolean> {
    const existingMedia = await this.repository.findById(id);
    if (!existingMedia) {
      throw new Error('Lei media not found');
    }
    return this.repository.delete(id);
  }
} 