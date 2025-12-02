const app = require('./src/app');
const consumer = require('./src/queue/consumer');

const { config } = require('./src/config');
const { port, host } = config.app;

app
  .listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
    consumer();
  })
  .on('error', (error) => {
    console.log('Server gagal dijalankan: ', error);
    process.exit(1);
  });
