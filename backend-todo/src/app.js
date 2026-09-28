import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { env } from './config/env.js';

const app = express();

app.set('trust proxy', 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'https://todo-app-git-main-virat23210-5197.vercel.app',
  ...(env.frontendUrl ? env.frontendUrl.split(',').map((s) => s.trim().replace(/\/+$/, '')) : []),
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    try {
      const cleanOrigin = origin.replace(/\/+$/, '');
      const hostname = new URL(origin).hostname;
      const isAllowed =
        allowedOrigins.includes(cleanOrigin) ||
        hostname.endsWith('.vercel.app') ||
        cleanOrigin === env.frontendUrl;

      if (isAllowed) {
        return callback(null, true);
      }
    } catch {
      // invalid URL
    }
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '100kb' }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.get('/health', (req, res) =>
  res.json({ success: true, data: { status: 'ok' } })
);

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

export default app;
