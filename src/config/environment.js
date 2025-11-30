const path = require('path');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';
const baseEnvPath = path.resolve(process.cwd(), '.env');
const envSpecificPath = path.resolve(process.cwd(), `.env.${env}`);

dotenv.config({ path: baseEnvPath });
dotenv.config({ path: envSpecificPath, override: true });

module.exports = {
  port: process.env.PORT,
  host: process.env.HOST,
  env: process.env.NODE_ENV || 'development',
  userPass: process.env.USER_PASSWORD,
  ML_API_URL: process.env.ML_API_URL,
  rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
  emailQueueName: process.env.EMAIL_QUEUE_NAME || 'email-queue',
};
