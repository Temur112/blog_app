import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './modules/auth/auth.routes.js';
import { errorHandler } from './shared/middleware/error.middleware.js';

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


app.use('/api/auth', authRoutes);


// Global error handler
app.use(errorHandler);

export default app;
