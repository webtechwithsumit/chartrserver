import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import routers from './routes/routes.js';
import dbCon from "./utlis/db.js";
import { exec } from 'child_process';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
dbCon();

// origin: process.env.RENDER_EXTERNAL_URL || '*',
// CORS Setup to Allow Localhost, Render, and Netlify
const allowedOrigins = [
    process.env.RENDER_EXTERNAL_URL,
    'http://localhost:3000',
    'https://chhartr.netlify.app'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS policy violation: ${origin} is not allowed by CORS`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight OPTIONS requests globally
app.options('*', cors());

app.use(express.json());

// Swagger Setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger Application',
            version: '1.0.0',
            description: 'API documentation for your application',
        },
        servers: [
            {
                url: process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`  // Correct server URL
            },
        ],
    },
    apis: ['./routes/routes.js'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI at /swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// API Routes
app.use('/api', routers);

// Only open browser in development
const shouldOpenBrowser = !process.argv.includes('--no-open') && process.env.NODE_ENV !== 'production';

// Bind to 0.0.0.0 for Render hosting
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}/swagger`);

    if (shouldOpenBrowser) {
        const url = `http://localhost:${PORT}/swagger`;
        switch (process.platform) {
            case 'darwin': exec(`open ${url}`); break;
            case 'win32': exec(`start ${url}`); break;
            case 'linux': exec(`xdg-open ${url}`); break;
            default: console.log('Swagger UI available at:', url);
        }
    }
});
