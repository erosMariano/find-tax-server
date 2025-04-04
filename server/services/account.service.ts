import { Account } from "../entities/account.entity";
import { AccountRepository } from "../repositories/account.repository";

export class AccountService {
  private repository: AccountRepository;

  constructor() {
    this.repository = new AccountRepository();
  }

  async getAllAccounts(): Promise<Account[]> {
    return this.repository.findAll();
  }

  async getAccountById(id: string): Promise<Account | null> {
    return this.repository.findById(id);
  }

  async getAccountByEmail(email: string): Promise<Account | null> {
    return this.repository.findByEmail(email);
  }

  async createAccount(accountData: Partial<Account>): Promise<Account> {
    return this.repository.create(accountData);
  }

  async updateAccount(id: string, accountData: Partial<Account>): Promise<Account | null> {
    const existingAccount = await this.repository.findById(id);
    if (!existingAccount) {
      throw new Error('Account not found');
    }
    return this.repository.update(id, accountData);
  }

  async deleteAccount(id: string): Promise<boolean> {
    const existingAccount = await this.repository.findById(id);
    if (!existingAccount) {
      throw new Error('Account not found');
    }
    return this.repository.delete(id);
  }

  async updateLastLoggedAt(id: string): Promise<Account | null> {
    const existingAccount = await this.repository.findById(id);
    if (!existingAccount) {
      throw new Error('Account not found');
    }
    return this.repository.updateLastLoggedAt(id);
  }
} 