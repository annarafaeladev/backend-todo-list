import 'dotenv/config'
import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateTarefasTable1693922022359 } from './migrations/1693922022359-CreateTarefasTable';
import { Category } from '../app/entities/Category';

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DN_NAME,
    synchronize: true,
    logging: false,
    entities: [Category],
    migrations: [CreateTarefasTable1693922022359],
    subscribers: [],
})
