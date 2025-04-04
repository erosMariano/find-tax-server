import { Router } from 'express';
import { AccountService } from '../services/account.service';

const router = Router();
const accountService = new AccountService();

router.get('/accounts', async (req, res) => {
  try {
    const accounts = await accountService.getAllAccounts();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accounts', error });
  }
});

export default router;