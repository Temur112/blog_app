import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { errorHandler } from './shared/middleware/error.middleware.js';


//import routes
import authRoutes from './modules/auth/auth.routes.js';
import postRoutes from './modules/posts/post.routes.js';
import tagRoutes from './modules/tags/tag.routes.js';





const app = express();


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Blog API"
    });
});


// register routurs
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/tags', tagRoutes);


// Global error handler
app.use(errorHandler);

export default app;
