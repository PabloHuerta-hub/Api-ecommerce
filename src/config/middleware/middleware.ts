// middleware.ts
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import logginFunctions from "./loggin";
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(logginFunctions.loggerMiddleware);
app.use(morgan('dev'))
app.use(cors());

export default app;
