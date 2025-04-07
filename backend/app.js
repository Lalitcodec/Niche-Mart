import express from 'express';
import { config } from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { connection } from './database/connection.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import fileUpload from 'express-fileupload';

const app = express()
config({path: "./config/config.env"})

app.use(
    cors({
        origin : [process.env.FRONTEND_URL],
        methods : ["GET","POST","PUT","DELETE"],
        credentials : true
    })
);

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(errorMiddleware)

app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : "/temp/"
    })
)

connection()

export default app; 