import { config } from "./config";
import express from "express";
import helmet from "helmet";
import {check,validationResult} from 'express-validator';
import rateLimit from 'express-rate-limit';
import ingest from "./routes/ingestroutes";
import chatModel from "./routes/chatmodelroutes";
import SavePrompt from "./routes/promptroutes";
import health from "./routes/health";
import SaveKey from "./routes/savekeyroutes";
import Logger from "./utils/logger";
import 'dotenv/config';

// * Logger
const logger = new Logger();

// * Rate Limiter config
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 peticiones por ventana
  message: "Too many requests from this IP, please try again after 15 minutes."
});

const app = express();
app.use(express.json());

// * Helmet Security Middleware
app.use(helmet());

// * Rate Limiter Middleware
app.use(limiter);

// * CheckHealth Route
app.use("/health", health);

// * Middleware for token
app.use((req, res, next) => {
  if (req.headers["apikey"] === config.apiKey) {
    next();
  } else {
    res.status(403).send("Unauthorized");
  }
});

// * Ingest Route
// app.use("/ingest", ingest);
app.post('/ingest', [
  check('data').isString().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
], ingest);

// * Chat Route
app.use("/ai", chatModel);

// * Prompt Route
app.use("/prompt", SavePrompt);

// * Save Key Route
app.use("/saveKey", SaveKey);

// * Start Server
app.listen(config.port, () => {
  logger.log(`Server running on http://${config.host}:${config.port}`);
});
