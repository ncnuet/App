import express, { Express } from 'express';
import helmet from "helmet";
import session from "express-session";
import passport from "passport";
import * as cors from "cors";
import morgan from "morgan";

import route from './routes';
import "./configs/login_fb";
import config from './configs/config_env';

// cookieParser
// SQLlite

// Initialize application
const app: Express = express();
const port = config.PORT;

// Initialize middleware
app.use(morgan(process.env.NODE_ENV === 'dev' ? "dev" : "tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // protection middleware
app.use(cors.default({
  origin: config.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type, Authorization']
}))

// save session login in memory storage. This setting is required by fb authentication
app.use(session({
  secret: config.JWT_KEY,
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
}));

// Initialize some tasks (assign functions, variables to req,...)
app.use(passport.initialize());

// Initialize routes
route(app);

if (require.main === module) { // true if file is executed by cmd. This lines for testing purposes
  // Start application
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

export default app;