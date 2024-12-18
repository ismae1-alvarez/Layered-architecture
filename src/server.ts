import express, { Express } from 'express';
import { configHelmet, connectDB, corsOptions, limiter, swaggerSpec } from './config';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';
import helmet from "helmet";
import { AppRoutes } from './routes';

// Connection
connectDB();

const app: Express = express();

// Cors
app.use(cors(corsOptions));


// Use Helmet!
app.use(helmet(configHelmet));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rateLimit
app.use(limiter);

// Routes
app.use('/api/v1/', AppRoutes.routes);

// Docs
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default app;
