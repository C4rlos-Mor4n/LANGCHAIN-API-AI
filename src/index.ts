import { config } from "./config";
import express from "express";
import ingest from "./routes/ingestroutes";
import chatModel from "./routes/chatmodelroutes";
import SavePrompt from "./routes/promptroutes";
import health from "./routes/health";

const app = express();
app.use(express.json());

app.use("/ingest", ingest);
app.use("/ai", chatModel);
app.use("/prompt", SavePrompt);
app.use("/health", health);

app.listen(config.port, () => {
  console.log(`Server running on http://${config.host}:${config.port}`);
});
