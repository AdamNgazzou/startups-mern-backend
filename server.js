const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const authorRoute = require('./backend/routes/author.route.js');
const startupRoute = require('./backend/routes/startup.route.js');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Middleware
    server.use(express.json());

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

        // Log the query parameters
        console.log("Query:", query);
        console.log("Page:", page);

        // Pass query and page to the Next.js page
        return app.render(req, res, '/', { query, page });
    });

    // Handle Next.js pages
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const port = process.env.PORT || 3000;
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});