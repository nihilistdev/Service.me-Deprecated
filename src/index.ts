import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

export const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
