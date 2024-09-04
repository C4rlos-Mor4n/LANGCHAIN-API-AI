import { config } from "./config";
import express from "express";
import ingest from "./routes/ingestroutes";
import chatModel from "./routes/chatmodelroutes";
import SavePrompt from "./routes/promptroutes";
import health from "./routes/health";
import SaveKey from "./routes/savekeyroutes";
import Logger from "./utils/logger";

const logger = new Logger();

const app = express();
app.use(express.json());

app.use("/health", health);

// middleware for token
app.use((req, res, next) => {
  if (req.headers["apikey"] === config.apiKey) {
    next();
  } else {
    res.status(403).send("Unauthorized");
  }
});

app.use("/ingest", ingest);
app.use("/ai", chatModel);
app.use("/prompt", SavePrompt);
app.use("/saveKey", SaveKey);

app.listen(config.port, () => {
  logger.log(`Server running on http://${config.host}:${config.port}`);
});
