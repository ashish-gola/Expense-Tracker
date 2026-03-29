import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './user/user.routes.js';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();

// app level middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({ message: 'Setup Successful' });
});

// routes level middleware
app.use("/api/user", userRouter);

// Start server only after DB connects
const startServer = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Database connected successfully');

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (err) {
        console.error('Failed to connect to database:', err.message);
        process.exit(1); // Exit so nodemon can restart cleanly
    }
};

startServer();