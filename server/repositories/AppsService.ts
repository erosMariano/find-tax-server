import { Apps } from '../entities/Apps';
import { AppsRepository } from '../repositories/AppsRepository';

export class AppsService {
  private repository: AppsRepository;

  constructor() {
    this.repository = new AppsRepository();
  }

  async getAllApps(): Promise<Apps[]> {
    return this.repository.findAll();
  }

  async getAppByUuid(appUuid: string): Promise<Apps | null> {
    return this.repository.findByUuid(appUuid);
  }

  async getAppsByName(name: string): Promise<Apps[]> {
    return this.repository.findByName(name);
  }

  async getAppsByProviderUuid(appProviderUuid: string): Promise<Apps[]> {
    return this.repository.findByProviderUuid(appProviderUuid);
  }

  async createApp(appData: Partial<Apps>): Promise<Apps> {
    if (!appData.name) {
      throw new Error('Name is required');
    }
    if (!appData.description) {
      throw new Error('Description is required');
    }
    if (!appData.appProviderUu || !appData.appProviderUu.uuid) {
      throw new Error('App Provider UUID is required');
    }
    return this.repository.create(appData);
  }

  async updateApp(appUuid: string, appData: Partial<Apps>): Promise<Apps | null> {
    const existingApp = await this.repository.findByUuid(appUuid);
    if (!existingApp) {
      throw new Error('App not found');
    }
    return this.repository.update(appUuid, appData);
  }

  async deleteApp(appUuid: string): Promise<boolean> {
    const existingApp = await this.repository.findByUuid(appUuid);
    if (!existingApp) {
      throw new Error('App not found');
    }
    return this.repository.delete(appUuid);
  }

  async updateAppUpdatedAt(appUuid: string): Promise<Apps | null> {
    const existingApp = await this.repository.findByUuid(appUuid);
    if (!existingApp) {
      throw new Error('App not found');
    }
    return this.repository.updateUpdatedAt(appUuid);
  }
}