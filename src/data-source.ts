import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Team } from './entity/Team'
import { WorkPeriod } from './entity/WorkPeriod'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'timetracking',
    synchronize: false,
    logging: false,
    entities: [User, Team, WorkPeriod],
    migrations: [],
    subscribers: [],
})
