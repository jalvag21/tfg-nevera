import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import foodRoutes from './routes/food.routes.js';
import fridgeRoutes from './routes/fridge.routes.js';
import readingRoutes from './routes/reading.routes.js';
import alertRoutes from './routes/alert.routes.js';
import userRoutes from './routes/user.routes.js';
import exportRoutes from './routes/export.routes.js';
import errorMiddleware from './middlewares/error.js';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true }));
app.use(morgan('dev'));

app.get('/api/health', (req,res)=>res.json({status:'ok', ts: new Date().toISOString()}));

app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/fridges', fridgeRoutes);
app.use('/api/readings', readingRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/users', userRoutes);
app.use('/api/export', exportRoutes);

app.use(errorMiddleware);

export default app;
