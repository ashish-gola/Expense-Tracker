import express from 'express';
import userRouter from './user/user.routes.js';
import morgan from 'morgan';

const app = express();

// app level middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Setup Successful' });
});

// routes level middleware
app.use("/api/user", userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});