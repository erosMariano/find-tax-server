import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { AppDataSource } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class AccountRepository {
  private repository: Repository<Account>;

  constructor() {
    this.repository = AppDataSource.getRepository(Account);
  }

  async findAll(): Promise<Account[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Account | null> {
    return this.repository.findOne({
      where: { id }
    });
  }

  async findByEmail(email: string): Promise<Account | null> {
    return this.repository.findOne({
      where: { email }
    });
  }

  async create(accountData: Partial<Account>): Promise<Account> {
    const account = this.repository.create({
      ...accountData,
      id: uuidv4(), // Gera o ID aqui
    });
    return this.repository.save(account);
  }

  async update(id: string, accountData: Partial<Account>): Promise<Account | null> {
    await this.repository.update(id, accountData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async updateLastLoggedAt(id: string): Promise<Account | null> {
    await this.repository.update(id, { lastLoggedAt: new Date() });
    return this.findById(id);
  }
} 