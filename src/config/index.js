require('dotenv').config();
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const redis = require('redis');

const config = {
  app: {
    port: process.env.PORT,
    host: process.env.HOST,
    userPass: process.env.USER_PASSWORD,
  },

  jwt: {
    accessToken: process.env.ACCESS_TOKEN_KEY,
    refreshToken: process.env.REFRESH_TOKEN_KEY,
  },

  ml: {
    serviceUrl: process.env.ML_API_URL,
  },

  rabbitmq: {
    server: process.env.RABBITMQ_URL,
  },
};

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,

  max: 10,
  idleTimeoutMillis: 30000,
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_SERVER,
  },
});

module.exports = { config, pool, transporter, redisClient };
