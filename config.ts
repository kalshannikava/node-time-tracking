import dotenv from 'dotenv';

dotenv.config();

const config = {
  type: 'postgres',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || '',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/src/entities/*.entity.ts'],
  migrations: [],
  subscribers: [],
};

export default config;