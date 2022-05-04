'use strict'
import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import routes from './config/routes';
import "express-async-errors";
import { AppError } from "./model/AppError";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', routes);
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
          return response.status(err.status).json({ message: err.message });
        }
    
        return response.status(500).json({
          status: "error",
          message: `Internal server error - ${err.message}`,
        });
      },
);

app.listen(4321, () => {
    console.log('[INFO] Run on port', 4321);
});