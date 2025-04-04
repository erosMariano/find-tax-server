import express from 'express';
import { config } from 'dotenv';
import { AppDataSource, initializeDatabase } from './config/database';
import accountRoutes from './routes/account.routes';
import cors from 'cors';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', accountRoutes); // Monta as rotas em /api

app.get('/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const startServer = async () => {
  const dbInitialized = await initializeDatabase();
  if (dbInitialized) {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } else {
    console.error('Failed to start server due to database initialization error');
  }
};

startServer();