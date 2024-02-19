import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'timetracking',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/entities/*.entity.ts'],
    migrations: [],
    subscribers: [],
})
