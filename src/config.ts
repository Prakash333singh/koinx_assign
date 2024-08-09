// src/config.ts
import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  MONGODB_URI: string;
}

export const config: Config = {
  PORT: parseInt(process.env.PORT!) || 3000,
  MONGODB_URI: process.env.DATABASE_URL!,
};
