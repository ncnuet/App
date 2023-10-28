import express from 'express';
import helmet from "helmet";
import * as cors from "cors";
import morgan from "morgan";

import route from '@/routes';
import config, { env } from '@/configs/env';
import database from '@/configs/database';
import * as redis from '@/configs/redis';

// Initialize application
const app = express();
const port = config.PORT;

// Initialize middleware
app.use(morgan(env === 'dev' ? "dev" : "tiny")); // Logger
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet()); // Protect known attack types
app.use(cors.default({
  origin: config.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type, Authorization']
}))

// Initialize app's routes
route(app);

if (require.main === module) { // true if file is executed by cmd. This lines for testing purposes
  // Start application
  app.listen(port, async () => {
    await redis.startup();
    console.log("📕 [database]: Connected to redis");
    await database.getConnection()
    console.log("📒 [database]: Connected to mysql");
    console.log(`✅ [server]: Server is running at http://localhost:${port}`);
  });
}

export default app;