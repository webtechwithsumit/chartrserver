import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import routers from './routes/routes.js';
import dbCon from "./utlis/db.js";
import { exec } from 'child_process';

// Import Swagger packages
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const PORT = process.env.PORT || 8000;

dotenv.config();
const app = express();
dbCon();

// Enhanced CORS setup
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Swagger setup
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
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./routes/routes.js'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api', routers);

const shouldOpenBrowser = !process.argv.includes('--no-open');

app.listen(PORT, 'localhost', () => {
    console.log(`Server running on http://localhost:${PORT}/swagger`);

    if (shouldOpenBrowser) {
        const url = `http://localhost:${PORT}/swagger`;
        switch (process.platform) {
            case 'darwin': exec(`open ${url}`); break;
            case 'win32': exec(`start ${url}`); break;
            case 'linux': exec(`xdg-open ${url}`); break;
            default: console.log('Unsupported platform');
        }
    }
});

