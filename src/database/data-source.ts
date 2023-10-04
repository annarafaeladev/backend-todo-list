import 'dotenv/config'
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category } from '../app/entities/Category';
import { User } from '../app/entities/User';
import { Task } from '../app/entities/Task';
import { SubTask } from '../app/entities/SubTask';
import { CreateCategoriesTable1693922022359 } from './migrations/1693922022359-CreateCategoriesTable';
import { CreateUsersTable1693944621497 } from './migrations/1693944621497-CreateUsersTable';
import { CreateTasksTable1693951636255 } from './migrations/1693951636255-CreateTasksTable';
import { CreateSubTasksTable1694009727789 } from './migrations/1694009727789-CreateSubTasksTable';



const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_URI,
    // synchronize: true,
    // logging: false,
    // host: process.env.DB_HOST,
    // port: port,
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    entities: [Category, User, Task, SubTask],
    migrations: [CreateCategoriesTable1693922022359, CreateUsersTable1693944621497, CreateTasksTable1693951636255, CreateSubTasksTable1694009727789],
    subscribers: [],
})
