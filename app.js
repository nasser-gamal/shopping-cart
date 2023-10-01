import express from 'express';
import { dbConnection } from './config/database.js';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import path, { dirname } from 'path';
import cors from 'cors';
import globalError from './middleware/errorMiddleware.js';
import ApiError from './utils/apiError.js';
import limiter from './middleware/rateLimitMiddleware.js';
import docsOptions from './docs/swagger.js';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();

dbConnection();

// enable domains to access the app
app.use(cors());
app.options('*', cors());

// Middlwares
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(dirname('uploads')));
app.use(limiter);

// Swagger 
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(docsOptions));
// Routes 
app.use('/api/v1', routes);

app.all('*', (req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 404));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
