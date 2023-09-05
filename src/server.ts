import 'reflect-metadata';
import 'express-async-errors'
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import { routes } from './app/routes/routes';
import { errorMiddleware } from './app/middleware/error';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(express.urlencoded({ extended: true }));

app.use(errorMiddleware)

AppDataSource.initialize().then(async () => {
    app.listen(process.env.SERVER_PORT, () => console.log(`Server is running port ${process.env.SERVER_PORT}...`))
})
