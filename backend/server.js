// filepath: /c:/Users/LENOVO/Desktop/Projects2024/Next js projects/pitchify/startups/backend/server.js
require('dotenv').config({ path: '.env.local' });
const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const authorRoute = require('./routes/author.route.js');
const startupRoute = require('./routes/startup.route.js');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: '../client' }); // Set the correct project root
const handle = app.getRequestHandler();
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');
const compression = require("compression");
const { redisClient } = require('./redis/redisClient');

app.prepare().then(() => {
    const server = express();

    // Middleware
    server.use(compression());
    server.use(express.json());
    server.use(cors());

    // Connect to the database
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Connected to the database');
            console.log("Checking database collections...");

            mongoose.connection.db.listCollections().toArray((err, collections) => {
                if (err) {
                    console.error("Error listing collections:", err);
                } else {
                    console.log("Collections in the database:", collections.map(col => col.name));
                }
            });
        })
        .catch(() => {
            console.log('Connection failed');
        });

    // API routes
    server.use('/api/authors', authorRoute);
    server.use('/api/startups', startupRoute);

    // Default route to handle query parameters
    server.get('/', (req, res) => {
        const { query = "", page = "1" } = req.query;
        // Pass query and page to the Next.js page
    });

    // Handle Next.js pages
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    //handle redis disconnection
    process.on('SIGINT', async () => {
        await redisClient.quit();
        console.log("Redis client disconnected. Server shutting down.");
        process.exit(0);
    });

    const port = process.env.PORT || 3000;
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });

    // Cron job to keep the server awake
    cron.schedule('*/1 * * * *', () => {
        axios.get(`http://localhost:${port}/api/authors`)
            .then(response => {
                console.log('Pinged server to keep it awake:', response.status);
            })
            .catch(error => {
                console.error('Error pinging server:', error);
            });
    });
});
