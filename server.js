const app = require('./src/app');
const consumer = require('./src/queue/consumer');

const { config, redisClient } = require('./src/config');
const { port, host } = config.app;

const init = async () => {
  try {
    await redisClient.connect();
    console.log('Redis connected');

    app.listen(port, host, () => {
      console.log(`Server berjalan pada http://${host}:${port}`);
      consumer();
    });
  } catch (error) {
    console.log('Server gagal dijalankan: ', error);
    process.exit(1);
  }
};

init();
