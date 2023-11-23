import express from "express";
import helmet from "helmet";
import * as cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import route from "@/routes";
import config, { env } from "@/configs/env";
import * as database from "@/configs/database";
import * as redis from "./configs/redis";
import * as mailer from "@/utils/send_mail";
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schema';
import { graphqlHTTP } from 'express-graphql';


// Initialize application
const app = express();
const port = config.PORT;

// Initialize middleware
app.use(morgan(env === "dev" ? "dev" : "tiny")); // Logger
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(helmet()); // Protect known attack types
app.use(cors.default({
  origin: config.FRONTEND,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type, Authorization']
}))

// Initialize app's routes
route(app);
// Apply graphql
// app.all('/graphql', createHandler({ schema }));
app.use("/v1/graphql/",
  graphqlHTTP({
    schema,
    graphiql: true
  }));

if (require.main === module) {
  // true if file is executed by cmd. This lines for testing purposes
  // Start application
  app.listen(port, async () => {
    await redis.startup();
    console.log("📕 [database]: Connected to redis");
    await database.connect();
    console.log("📒 [database]: Connected to mongo");
    // await mailer.startup();
    // console.log("💌 [database]: Connected to mailer");

    console.log(`✅ [server]: Server is running at http://localhost:${port}`);
  });
}

export default app;
