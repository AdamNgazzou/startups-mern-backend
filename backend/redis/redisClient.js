// filepath: /c:/Users/LENOVO/Desktop/Projects2024/Next js projects/pitchify/startups/backend/redisClient.js
require('dotenv').config({ path: '.env.local' });
const Redis = require("redis");

const redisClient = Redis.createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-10624.c85.us-east-1-2.ec2.redns.redis-cloud.com:10624',
        port: 11871
    }
});

const DEFAULT_EXPIRATION = 3600;

// Connect to Redis and handle connection
(async () => {
    try {
        redisClient.on('error', err => console.error('Redis Client Error', err));
        redisClient.on('connect', () => console.log('Redis Client Connected'));
        await redisClient.connect();
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
        process.exit(1);
    }
})();

module.exports = { redisClient, DEFAULT_EXPIRATION };
