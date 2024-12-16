import cors from 'cors';

export const corsMiddleware = cors({
    origin: 'http://127.0.0.1:5500', // ou qualquer outra origem permitida
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});
