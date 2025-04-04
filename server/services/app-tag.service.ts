import { AppTag } from '../../server/entities/app-tag.entity';
import { AppTagRepository } from '../../server/repositories/app-tag.repository';

export class AppTagService {
  private repository: AppTagRepository;

  constructor() {
    this.repository = new AppTagRepository();
  }

  async getAllTags(): Promise<AppTag[]> {
    return this.repository.findAll();
  }

  async getTagById(id: string): Promise<AppTag | null> {
    return this.repository.findById(id);
  }

  async getTagsByAppId(appId: string): Promise<AppTag[]> {
    return this.repository.findByAppId(appId);
  }

  async createTag(tagData: Partial<AppTag>): Promise<AppTag> {
    return this.repository.create(tagData);
  }

  async updateTag(id: string, tagData: Partial<AppTag>): Promise<AppTag | null> {
    const existingTag = await this.repository.findById(id);
    if (!existingTag) {
      throw new Error('Tag not found');
    }
    return this.repository.update(id, tagData);
  }

  async deleteTag(id: string): Promise<boolean> {
    const existingTag = await this.repository.findById(id);
    if (!existingTag) {
      throw new Error('Tag not found');
    }
    return this.repository.delete(id);
  }
} 