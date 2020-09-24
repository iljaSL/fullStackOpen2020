import config from './utils/config.js';
import express from 'express';
const app = express();
import cors from 'cors';
import blogsRouter from './controllers/blogs.js';
import middleware from './utils/middleware.js';
import logger from './utils/logger.js';
import mongoose from 'mongoose';

logger.info('connecting to', config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
