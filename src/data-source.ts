import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import config from '../config';

export const AppDataSource = new DataSource(config as DataSourceOptions);

